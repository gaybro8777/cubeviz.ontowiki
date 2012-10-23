/// <reference path="..\DeclarationSourceFiles\jquery.d.ts" />
/// <reference path="..\DeclarationSourceFiles\JSON.d.ts" />

class System {
    
    /**
     * Counts number of an given object.
     */
    static countProperties ( obj:Object ) : number {
        var keyCount = 0, k = null;
        for (k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                ++keyCount;
            }
        }
        return keyCount;
    }
    
    /**
     * Copy an given element, but renew the reference so there is no connection to the old one.
     */
    static deepCopy ( elementToCopy : Object ) : any {
        var newElement = $.parseJSON ( JSON.stringify ( elementToCopy ) );
        return newElement;
    }
    
    /**
     * Outputs only if context is "development"
     * Should prevent you running into errors if browser doesnt support console.log
     */
    static out ( output: any ) : void {
        if ( typeof console !== "undefined" 
              && typeof console.log !== "undefined" 
              && "development" == CubeViz_Config.context ) {
            console.log ( output );
        }
    }
    
    /**
     * Split a given key into units, build a chain and set the given value.
     * For instance: key=foo.bar.foobar will be transformed and evaled as obj[foo][bar][foobar] = value;
     */
    static setObjectProperty ( obj:Object, key:string, separator:string, value:any ) : void {
        var keyList = key.split ( separator ),
            call = "obj ";
        for ( var i in keyList ) {
            call += '["' + keyList [i] + '"]';
            eval ( call + " = " + call + " || {};" );
        }
        eval ( call + " = value;" ); 
    }
}
