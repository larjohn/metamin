<?php
/**
 * Created by JetBrains PhpStorm.
 * User: larjohns
 * Date: 16/6/2013
 * Time: 3:56 μμ

 */

class RDFErrorController extends BaseController
{
    public function getFacets(){


        $collection = new RDFErrorCollection();
        $facets = $collection->getFacets();
        return Response::json($facets);

    }

    public function getList(){
        return $this->getIndex();
    }


    public function getIndex()
    {
        $limit = Input::get('rows', 10);
        $page =  Input::get('page', 0);
        $sort = Input::get('sidx', "");
        $order = Input::get('sord', "asc");
        $filters = Input::get('filters', array());
//var_dump($filters);
        $sortProperties = self::getSorter($sort);
        $collection = new RDFErrorCollection();
        $collection->setFilters($filters);
        $all = $collection->getAll($page,$limit, $sortProperties,$order);

        $facets = $collection->getFacets();
        $rdf_objects = $all["data"];
        $rdf_errors = array();
        $errors = array();
        $dbpedia_resources = array();
        $dbpedia_properties = array();

        foreach ($rdf_objects as $rdf_object) {
            if (!is_a($rdf_object, "RDFError")) continue;

            $rdf_errors[] = $rdf_object;
            if (isset($rdf_object->violationRoot)) {
                $violation_roots = $rdf_object->violationRoot;
                $dbpedia_resources = array_merge($dbpedia_resources, $violation_roots);
            }
            if (isset($rdf_object->inaccurateProperty)) {
                $violation_paths = $rdf_object->inaccurateProperty;

                $dbpedia_properties = array_merge($dbpedia_properties, $violation_paths);
            }
        }

        RDFDBpediaResource::lazyLoad($dbpedia_resources, ["label"]);
        RDFProperty::lazyLoad($dbpedia_properties,["label"]);

        foreach ($rdf_errors as $rdf_error) {

            $error = $rdf_error->toArray();

            $errors[] = $error;

        }
        $count = $all["count"];
        $output = array(
            "page"=>$page,
            "total"=>ceil($count/$limit)-1,
            "records"=>$count,
            "errors"=>$errors,
            "facets"=>$facets,

        );


        return Response::json($output);
    }


    public function getItem(){
        $resource = Input::get('resource', "");
        $property = Input::get('property', "");
        $test = Input::get('test', "");
        $query = Input::get('query', "");
        $rdf_error =  RDFError::findTriple($resource,$property,$test,$query);

        if($rdf_error) $rdf_error->load_value();

        $error = $rdf_error->toArray();

        return Response::json($error);


    }


    private static function getSorter($sidx){
        $sortProperties = explode( ".",$sidx);

        foreach ($sortProperties as $k=>$value) {
            if(is_numeric($value))
                unset($sortProperties[$k]);
        }


        return $sortProperties;

    }




}
