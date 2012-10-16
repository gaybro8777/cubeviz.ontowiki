var Component = (function () {
    function Component() { }
    Component.loadAll = function loadAll(dsdUrl, dsUrl, callback) {
        $.ajax({
            type: "POST",
            url: CubeViz_Config.cubevizPath + "getcomponents/",
            data: {
                m: CubeViz_Config.selectedModel,
                dsdUrl: dsdUrl,
                dsUrl: dsUrl,
                cT: "dimension"
            }
        }).done(function (entries) {
            Component.prepareLoadedComponents(entries, callback);
        });
    }
    Component.prepareLoadedComponents = function prepareLoadedComponents(entries, callback) {
        entries = $.parseJSON(entries);
        for(var i in entries) {
            entries[i].elementCount = entries[i].elementCount || 0;
            entries[i].selectedElementCount = entries[i].elementCount || 0;
        }
        entries = {
            "dimensions": entries
        };
        console.log("prepareLoadedComponents");
        console.log(entries);
        callback(entries);
    }
    return Component;
})();
var DataStructureDefinition = (function () {
    function DataStructureDefinition() { }
    DataStructureDefinition.loadAll = function loadAll(callback) {
        $.ajax({
            type: "POST",
            url: CubeViz_Config.cubevizPath + "getdatastructuredefinitions/",
            data: {
                m: CubeViz_Config.selectedModel
            }
        }).done(callback);
    }
    return DataStructureDefinition;
})();
var DataSet = (function () {
    function DataSet() { }
    DataSet.loadAll = function loadAll(dsdUrl, callback) {
        $.ajax({
            type: "POST",
            url: CubeViz_Config.cubevizPath + "getdatasets/",
            data: {
                m: CubeViz_Config.selectedModel,
                dsdUrl: dsdUrl
            }
        }).done(callback);
    }
    return DataSet;
})();
var System = (function () {
    function System() { }
    System.out = function out(output) {
        if(typeof console !== "undefined" && typeof console.log !== "undefined" && "development" == CubeViz_Config.context) {
            console.log(output);
        }
    }
    System.call = function call(f, param) {
        if(typeof f !== "undefined") {
            if(typeof param !== "undefined") {
                eval("f (param);");
            } else {
                f();
            }
        }
    }
    System.rand = function rand() {
        return Math.floor(Math.random() * (2147483647 + 1));
    }
    return System;
})();
var CubeViz_Config = CubeViz_Config || {
};
var CubeViz_Link_Chosen_Module = CubeViz_Link_Chosen_Module || {
};
var CubeViz_Links_Module = CubeViz_Links_Module || {
};
var CubeViz_Parameters_Component = CubeViz_Parameters_Component || {
};
var CubeViz_Parameters_Module = CubeViz_Parameters_Module || {
};
var CubeViz_Dimension_Template = CubeViz_Dimension_Template || {
};
$(document).ready(function () {
    Module_Event.ready();
});
var Module_Event = (function () {
    function Module_Event() { }
    Module_Event.ready = function ready() {
        Module_Event.setupDataStructureDefinitionBox();
    }
    Module_Event.onComplete_LoadComponents = function onComplete_LoadComponents(entries) {
        Module_Main.buildComponentSelection(entries);
        CubeViz_Parameters_Module.selectedDimensionComponents = entries;
    }
    Module_Event.onComplete_LoadDataSets = function onComplete_LoadDataSets(entries) {
        var dataSets = $.parseJSON(entries);
        Module_Main.buildDataSetBox(dataSets);
        if(0 == dataSets.length) {
            CubeViz_Parameters_Module.selectedDS = dataSets;
        } else {
            if(1 <= dataSets.length) {
                CubeViz_Parameters_Module.selectedDS = dataSets[0].url;
                Component.loadAll(CubeViz_Parameters_Module.selectedDSD.url, dataSets[0].url, Module_Event.onComplete_LoadComponents);
            }
        }
    }
    Module_Event.onComplete_LoadDataStructureDefinitions = function onComplete_LoadDataStructureDefinitions(entries) {
        entries = $.parseJSON(entries);
        Module_Main.buildDataStructureDefinitionBox(entries);
        if(0 == entries.length) {
            CubeViz_Parameters_Module.selectedDSD = entries;
        } else {
            if(1 <= entries.length) {
                CubeViz_Parameters_Module.selectedDSD = entries[0];
                DataSet.loadAll(entries[0].url, Module_Event.onComplete_LoadDataSets);
            }
        }
    }
    Module_Event.setupDataStructureDefinitionBox = function setupDataStructureDefinitionBox() {
        DataStructureDefinition.loadAll(Module_Event.onComplete_LoadDataStructureDefinitions);
    }
    return Module_Event;
})();
var Module_Main = (function () {
    function Module_Main() { }
    Module_Main.buildComponentSelection = function buildComponentSelection(options) {
        console.log("buildComponentSelection options");
        console.log(options);
        var tpl = jsontemplate.Template(CubeViz_Dimension_Template);
        try  {
            $("#sidebar-left-data-selection-dims-boxes").html(tpl.expand(options));
        } catch (e) {
            console.log("buildComponentSelection error");
            console.log(e);
        }
    }
    Module_Main.buildDataSetBox = function buildDataSetBox(options) {
        var entry = null;
        $("#sidebar-left-data-selection-sets").empty();
        for(var i in options) {
            entry = $("<option value=\"" + options[i].url + "\">" + options[i].label + "</option>");
            $("#sidebar-left-data-selection-sets").append(entry);
        }
    }
    Module_Main.buildDataStructureDefinitionBox = function buildDataStructureDefinitionBox(options) {
        var entry = null;
        $("#sidebar-left-data-selection-strc").empty();
        for(var i in options) {
            entry = $("<option value=\"" + options[i].url + "\">" + options[i].label + "</option>");
            $("#sidebar-left-data-selection-strc").append(entry);
        }
    }
    return Module_Main;
})();
