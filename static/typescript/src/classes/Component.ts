/// <reference path="..\DeclarationSourceFiles\jquery.d.ts" />

class Component {
    
    /**
     * Loads all components, specified by model uri, data structure definition, dataset
     * and component type.
     */
    static loadAll (dsdUrl, dsUrl, callback) {
        $.ajax({
            type: "POST",
            url: CubeViz_Config.cubevizPath + "getcomponents/",
            data: {
                m: CubeViz_Config.selectedModel,
                dsdUrl: dsdUrl,
                dsUrl: dsUrl,
                cT: "dimension" // possible: dimension, measure
            }
        }).done( function (entries) { 
            Component.prepareLoadedComponents (entries, callback); 
        });
    }
    
    /**
     * Set default values etc.
     */
    static prepareLoadedComponents ( entries, callback ) {
        
        entries = $.parseJSON ( entries );
        
        // set standard values
        for ( var i in entries ) {
            entries [i].elementCount = entries [i].elementCount || 0;
            entries [i].selectedElementCount = entries [i].elementCount || 0;
        }
        
        entries = { "dimensions": entries };        
        
        console.log ( "prepareLoadedComponents" );
        console.log ( entries );
        
        // call callback function with prepared entries
        callback ( entries );
    }
}
