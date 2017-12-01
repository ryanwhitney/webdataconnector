(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
	    var cols = [{
	        id: "USD",
	        dataType: tableau.dataTypeEnum.string
	    }];
	
	    var tableSchema = {
	        id: "earthquakeFeed",
	        alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
	        columns: cols
	    };
	
	    schemaCallback([tableSchema]);
	};

    myConnector.getData = function(table, doneCallback) {
	    $.getJSON("https://api.blocktrail.com/v1/BTC/price?api_key=MY_APIKEY", function(resp) {
	        var feat = resp,
	            tableData = [];
	
            tableData.push({
                "USD": feat.USD
            });
	
	        table.appendRows(tableData);
	        doneCallback();
	    });
	};

    tableau.registerConnector(myConnector);
    
    $(document).ready(function () {
	    $("#submitButton").click(function () {
	        tableau.connectionName = "USGS Earthquake Feed";
	        tableau.submit();
	    });
	});
 
})();