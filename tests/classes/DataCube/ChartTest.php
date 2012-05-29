<?php

require_once dirname ( __FILE__ ). '/../../bootstrap.php';

class DataCube_ChartTest extends PHPUnit_Framework_TestCase
{    
    public function setUp ()
    {        
    }
    
    public function tearDown ()
    {
    }
    
    public function testGetAvailableChartTypes()
    {
        $chart = new DataCube_Chart ();
        
        $availableChartTypes = $chart->getAvailableChartTypes ();
        
        $testChartTypes = array (
            'pie'
        );
        
        $this->assertEquals ($availableChartTypes, $testChartTypes);
    }
}