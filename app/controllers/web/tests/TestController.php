<?php
/**
 * User: larjohns
 * Date: 14/6/2013
 * Time: 11:24 μμ
 * To change this template use File | Settings | File Templates.
 */

class TestController extends BaseController {






    public function showTestOverview($test)
    {

            return View::make('tests/overview')
                ->with('title',"Overview of ". $test)
                ->with('bread', array("path"=>"tests.item","params"=>array("label"=>$test)))
                ->with("mode","item")
                ->with("test", $test);


    }


}