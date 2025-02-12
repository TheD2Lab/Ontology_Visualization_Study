const tutorialCitizenTree = {
	"name": "Citizenship",
	"children": [
		{
		    "name": "SeniorCitizens", "value": 100
		},
        {   
            "name": "NonSeniorCitizens", "value": 100,
            "children": [
                {"name": "Adults", "value": 50},
                {"name": "Children", "value": 50}
            ]
        }
	]
}