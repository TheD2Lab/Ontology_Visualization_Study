const pizzaData = [
	{"source": "Thing", "target": "DomainConcept", "label": "subclassOf"},
	{"source": "Thing", "target": "ValuePartition", "label": "subclassOf"},
	{"source": "DomainConcept", "target": "Country", "label": "subclassOf"},
	{"source": "DomainConcept", "target": "Food", "label": "subclassOf"},

	{"source": "Food", "target": "IceCream", "label": "subclassOf"},
	{"source": "Food", "target": "Pizza", "label": "subclassOf"},
	{"source": "Food", "target": "PizzaBase", "label": "subclassOf"},
	{"source": "Food", "target": "PizzaTopping", "label": "subclassOf"},

	{"source": "PizzaTopping", "target": "PizzaBase", "label": "disjointWith"},
	{"source": "PizzaBase", "target": "PizzaTopping", "label": "disjointWith"},

	{"source": "Pizza", "target": "UnclosedPizza", "label": "subclassOf"},
	{"source": "Pizza", "target": "CheesyPizzaCollection", "label": "subclassOf"},
	{"source": "Pizza", "target": "InterestingPizza", "label": "subclassOf"},
	{"source": "Pizza", "target": "MeatyPizza", "label": "subclassOf"},
	{"source": "Pizza", "target": "NamedPizza", "label": "subclassOf"},
	{"source": "Pizza", "target": "NonVegetarianPizza", "label": "subclassOf"},
	{"source": "Pizza", "target": "RealItalianPizza", "label": "subclassOf"},

	{"source": "SpicyPizzaCollection", "target": "SpicyPizza", "label": "intersectionOf"},
	{"source": "Pizza", "target": "SpicyPizzaCollection", "label": "subclassOf"},
	{"source": "SpicyTopping", "target": "SpicyPizzaCollection", "label": "subclassOf"},
	
	{"source": "Pizza", "target": "SpicyPizzaEquivalent", "label": "subclassOf"},

	{"source": "ThinAndCrispyPizzaCollection", "target": "ThinAndCrispyPizza", "label": "intersectionOf"},
	{"source": "Pizza", "target": "ThinAndCrispyPizzaCollection", "label": "subclassOf"},
	{"source": "ThinAndCrispyBase", "target": "ThinAndCrispyPizzaCollection", "label": "subclassOf"},
	
	{"source": "Pizza", "target": "VegetarianPizza", "label": "subclassOf"},

	{"source": "VegetarianPizza1Collection", "target": "VegetarianPizza1", "label": "intersectionOf"},
	{"source": "Pizza", "target": "VegetarianPizza1Collection", "label": "subclassOf"},
	{"source": "VegetarianTopping", "target": "VegetarianPizza1Collection", "label": "subclassOf"},	

	{"source": "Pizza", "target": "VegetarianPizza2", "label": "subclassOf"},

    {"source": "CheeseTopping", "target": "CheesyPizzaCollection", "label": "subclassOf"},
    {"source": "Pizza", "target": "CheesyPizzaCollection", "label": "subclassOf"},
    {"source": "CheesyPizzaCollection", "target": "CheesyPizza", "label": "intersectionOf"},

	{"source": "MeatTopping", "target": "MeatyPizzaCollection", "label": "subclassOf"},
    {"source": "Pizza", "target": "MeatyPizzaCollection", "label": "subclassOf"},
    {"source": "MeatyPizzaCollection", "target": "MeatyPizza", "label": "intersectionOf"},


	{"source": "American", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "American", "target": "Cajun", "label": "disjointWith"},
	{"source": "American", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "American", "target": "Caprina", "label": "disjointWith"},
	{"source": "American", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "American", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "American", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "American", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "American", "target": "LaReine", "label": "disjointWith"},
	{"source": "American", "target": "Margherita", "label": "disjointWith"},
	{"source": "American", "target": "Mushroom", "label": "disjointWith"},
	{"source": "American", "target": "Napoletana", "label": "disjointWith"},
	{"source": "American", "target": "Parmense", "label": "disjointWith"},
	{"source": "American", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "American", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "American", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "American", "target": "Rosa", "label": "disjointWith"},
	{"source": "American", "target": "Siciliana", "label": "disjointWith"},
	{"source": "American", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "American", "target": "Soho", "label": "disjointWith"},
	{"source": "American", "target": "Veneziana", "label": "disjointWith"},

	{"source": "AmericanHot", "target": "American", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Cajun", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Caprina", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "LaReine", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Margherita", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Mushroom", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Napoletana", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Parmense", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Rosa", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Siciliana", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Soho", "label": "disjointWith"},
	{"source": "AmericanHot", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Cajun", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Cajun", "target": "American", "label": "disjointWith"},
	{"source": "Cajun", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Cajun", "target": "Caprina", "label": "disjointWith"},
	{"source": "Cajun", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Cajun", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Cajun", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Cajun", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Cajun", "target": "LaReine", "label": "disjointWith"},
	{"source": "Cajun", "target": "Margherita", "label": "disjointWith"},
	{"source": "Cajun", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Cajun", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Cajun", "target": "Parmense", "label": "disjointWith"},
	{"source": "Cajun", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Cajun", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Cajun", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Cajun", "target": "Rosa", "label": "disjointWith"},
	{"source": "Cajun", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Cajun", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Cajun", "target": "Soho", "label": "disjointWith"},
	{"source": "Cajun", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Capricciosa", "target": "Cajun", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "American", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Caprina", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "LaReine", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Margherita", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Parmense", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Rosa", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Soho", "label": "disjointWith"},
	{"source": "Capricciosa", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Caprina", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Caprina", "target": "Cajun", "label": "disjointWith"},
	{"source": "Caprina", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Caprina", "target": "American", "label": "disjointWith"},
	{"source": "Caprina", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Caprina", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Caprina", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Caprina", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Caprina", "target": "LaReine", "label": "disjointWith"},
	{"source": "Caprina", "target": "Margherita", "label": "disjointWith"},
	{"source": "Caprina", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Caprina", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Caprina", "target": "Parmense", "label": "disjointWith"},
	{"source": "Caprina", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Caprina", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Caprina", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Caprina", "target": "Rosa", "label": "disjointWith"},
	{"source": "Caprina", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Caprina", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Caprina", "target": "Soho", "label": "disjointWith"},
	{"source": "Caprina", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Fiorentina", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Cajun", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "American", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Caprina", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "LaReine", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Margherita", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Parmense", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Rosa", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Soho", "label": "disjointWith"},
	{"source": "Fiorentina", "target": "Veneziana", "label": "disjointWith"},

	{"source": "FourSeasons", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Cajun", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "American", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Caprina", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "LaReine", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Margherita", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Mushroom", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Napoletana", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Parmense", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Rosa", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Siciliana", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Soho", "label": "disjointWith"},
	{"source": "FourSeasons", "target": "Veneziana", "label": "disjointWith"},

	{"source": "FruttiDiMare", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Cajun", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "American", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Caprina", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "LaReine", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Margherita", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Mushroom", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Napoletana", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Parmense", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Rosa", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Siciliana", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Soho", "label": "disjointWith"},
	{"source": "FruttiDiMare", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Giardiniera", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Cajun", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "American", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Caprina", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "LaReine", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Margherita", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Parmense", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Rosa", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Soho", "label": "disjointWith"},
	{"source": "Giardiniera", "target": "Veneziana", "label": "disjointWith"},


	{"source": "LaReine", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "LaReine", "target": "Cajun", "label": "disjointWith"},
	{"source": "LaReine", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "LaReine", "target": "American", "label": "disjointWith"},
	{"source": "LaReine", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "LaReine", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "LaReine", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "LaReine", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "LaReine", "target": "Caprina", "label": "disjointWith"},
	{"source": "LaReine", "target": "Margherita", "label": "disjointWith"},
	{"source": "LaReine", "target": "Mushroom", "label": "disjointWith"},
	{"source": "LaReine", "target": "Napoletana", "label": "disjointWith"},
	{"source": "LaReine", "target": "Parmense", "label": "disjointWith"},
	{"source": "LaReine", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "LaReine", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "LaReine", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "LaReine", "target": "Rosa", "label": "disjointWith"},
	{"source": "LaReine", "target": "Siciliana", "label": "disjointWith"},
	{"source": "LaReine", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "LaReine", "target": "Soho", "label": "disjointWith"},
	{"source": "LaReine", "target": "Veneziana", "label": "disjointWith"},


	{"source": "Margherita", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Margherita", "target": "Cajun", "label": "disjointWith"},
	{"source": "Margherita", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Margherita", "target": "American", "label": "disjointWith"},
	{"source": "Margherita", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Margherita", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Margherita", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Margherita", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Margherita", "target": "LaReine", "label": "disjointWith"},
	{"source": "Margherita", "target": "Caprina", "label": "disjointWith"},
	{"source": "Margherita", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Margherita", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Margherita", "target": "Parmense", "label": "disjointWith"},
	{"source": "Margherita", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Margherita", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Margherita", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Margherita", "target": "Rosa", "label": "disjointWith"},
	{"source": "Margherita", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Margherita", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Margherita", "target": "Soho", "label": "disjointWith"},
	{"source": "Margherita", "target": "Veneziana", "label": "disjointWith"},


	{"source": "Mushroom", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Cajun", "label": "disjointWith"},
	{"source": "Mushroom", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Mushroom", "target": "American", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Mushroom", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Mushroom", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Mushroom", "target": "LaReine", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Margherita", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Caprina", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Parmense", "label": "disjointWith"},
	{"source": "Mushroom", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Mushroom", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Mushroom", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Rosa", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Mushroom", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Soho", "label": "disjointWith"},
	{"source": "Mushroom", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Napoletana", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Cajun", "label": "disjointWith"},
	{"source": "Napoletana", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Napoletana", "target": "American", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Napoletana", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Napoletana", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Napoletana", "target": "LaReine", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Margherita", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Caprina", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Parmense", "label": "disjointWith"},
	{"source": "Napoletana", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Napoletana", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Napoletana", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Rosa", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Napoletana", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Soho", "label": "disjointWith"},
	{"source": "Napoletana", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Parmense", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Parmense", "target": "Cajun", "label": "disjointWith"},
	{"source": "Parmense", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Parmense", "target": "American", "label": "disjointWith"},
	{"source": "Parmense", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Parmense", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Parmense", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Parmense", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Parmense", "target": "LaReine", "label": "disjointWith"},
	{"source": "Parmense", "target": "Margherita", "label": "disjointWith"},
	{"source": "Parmense", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Parmense", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Parmense", "target": "Caprina", "label": "disjointWith"},
	{"source": "Parmense", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Parmense", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Parmense", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Parmense", "target": "Rosa", "label": "disjointWith"},
	{"source": "Parmense", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Parmense", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Parmense", "target": "Soho", "label": "disjointWith"},
	{"source": "Parmense", "target": "Veneziana", "label": "disjointWith"},

	{"source": "PolloAdAstra", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Cajun", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "American", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "LaReine", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Margherita", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Mushroom", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Napoletana", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Parmense", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Caprina", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Rosa", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Siciliana", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Soho", "label": "disjointWith"},
	{"source": "PolloAdAstra", "target": "Veneziana", "label": "disjointWith"},

	{"source": "PrinceCarlo", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Cajun", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "American", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "LaReine", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Margherita", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Mushroom", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Napoletana", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Parmense", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Caprina", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Rosa", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Siciliana", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Soho", "label": "disjointWith"},
	{"source": "PrinceCarlo", "target": "Veneziana", "label": "disjointWith"},

	{"source": "QuattroFormaggi", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Cajun", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "American", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "LaReine", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Margherita", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Mushroom", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Napoletana", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Parmense", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Caprina", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Rosa", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Siciliana", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Soho", "label": "disjointWith"},
	{"source": "QuattroFormaggi", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Rosa", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Rosa", "target": "Cajun", "label": "disjointWith"},
	{"source": "Rosa", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Rosa", "target": "American", "label": "disjointWith"},
	{"source": "Rosa", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Rosa", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Rosa", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Rosa", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Rosa", "target": "LaReine", "label": "disjointWith"},
	{"source": "Rosa", "target": "Margherita", "label": "disjointWith"},
	{"source": "Rosa", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Rosa", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Rosa", "target": "Parmense", "label": "disjointWith"},
	{"source": "Rosa", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Rosa", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Rosa", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Rosa", "target": "Caprina", "label": "disjointWith"},
	{"source": "Rosa", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Rosa", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Rosa", "target": "Soho", "label": "disjointWith"},
	{"source": "Rosa", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Siciliana", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Cajun", "label": "disjointWith"},
	{"source": "Siciliana", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Siciliana", "target": "American", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Siciliana", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Siciliana", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Siciliana", "target": "LaReine", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Margherita", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Parmense", "label": "disjointWith"},
	{"source": "Siciliana", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Siciliana", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Siciliana", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Rosa", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Caprina", "label": "disjointWith"},
	{"source": "Siciliana", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Soho", "label": "disjointWith"},
	{"source": "Siciliana", "target": "Veneziana", "label": "disjointWith"},

	{"source": "SloppyGuiseppe", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Cajun", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "American", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "LaReine", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Margherita", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Mushroom", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Napoletana", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Parmense", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Rosa", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Siciliana", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Caprina", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Soho", "label": "disjointWith"},
	{"source": "SloppyGuiseppe", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Soho", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Soho", "target": "Cajun", "label": "disjointWith"},
	{"source": "Soho", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Soho", "target": "American", "label": "disjointWith"},
	{"source": "Soho", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Soho", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Soho", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Soho", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Soho", "target": "LaReine", "label": "disjointWith"},
	{"source": "Soho", "target": "Margherita", "label": "disjointWith"},
	{"source": "Soho", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Soho", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Soho", "target": "Parmense", "label": "disjointWith"},
	{"source": "Soho", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Soho", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Soho", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Soho", "target": "Rosa", "label": "disjointWith"},
	{"source": "Soho", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Soho", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Soho", "target": "Caprina", "label": "disjointWith"},
	{"source": "Soho", "target": "Veneziana", "label": "disjointWith"},

	{"source": "Veneziana", "target": "Capricciosa", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Cajun", "label": "disjointWith"},
	{"source": "Veneziana", "target": "AmericanHot", "label": "disjointWith"},
	{"source": "Veneziana", "target": "American", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Fiorentina", "label": "disjointWith"},
	{"source": "Veneziana", "target": "FourSeasons", "label": "disjointWith"},
	{"source": "Veneziana", "target": "FruttiDiMare", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Giardiniera", "label": "disjointWith"},
	{"source": "Veneziana", "target": "LaReine", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Margherita", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Mushroom", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Napoletana", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Parmense", "label": "disjointWith"},
	{"source": "Veneziana", "target": "PolloAdAstra", "label": "disjointWith"},
	{"source": "Veneziana", "target": "PrinceCarlo", "label": "disjointWith"},
	{"source": "Veneziana", "target": "QuattroFormaggi", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Rosa", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Siciliana", "label": "disjointWith"},
	{"source": "Veneziana", "target": "SloppyGuiseppe", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Soho", "label": "disjointWith"},
	{"source": "Veneziana", "target": "Caprina", "label": "disjointWith"},

	
	{"source": "NamedPizza", "target": "American", "label": "subclassOf"},

	{"source": "American", "target": "AmericanCollection", "label": "unionOf"},
	{"source": "AmericanCollection", "target": "MozzarellaTopping", "label": "subclassOf"},
	{"source": "AmericanCollection", "target": "PeperoniSausageTopping", "label": "subclassOf"},
	{"source": "AmericanCollection", "target": "TomatoTopping", "label": "subclassOf"},

	{"source": "NamedPizza", "target": "AmericanHot", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "Cajun", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "Capricciosa", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "Caprina", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "Fiorentina", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "FourSeasons", "label": "subclassOf"},
	
	{"source": "NamedPizza", "target": "FruttiDiMare", "label": "subclassOf"},

	{"source": "FruttiDiMare", "target": "FruttiDiMareCollection", "label": "unionOf"},
	{"source": "FruttiDiMareCollection", "target": "GarlicTopping", "label": "subclassOf"},
	{"source": "FruttiDiMareCollection", "target": "MixedSeafoodTopping", "label": "subclassOf"},
	{"source": "FruttiDiMareCollection", "target": "TomatoTopping", "label": "subclassOf"},

	{"source": "NamedPizza", "target": "Giardiniera", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "LaReine", "label": "subclassOf"},
	
	{"source": "NamedPizza", "target": "Margherita", "label": "subclassOf"},
	{"source": "Margherita", "target": "MargheritaCollection", "label": "unionOf"},
	{"source": "MargheritaCollection", "target": "MozzarellaTopping", "label": "subclassOf"},
	{"source": "MargheritaCollection", "target": "TomatoTopping", "label": "subclassOf"},

	{"source": "NamedPizza", "target": "Mushroom", "label": "subclassOf"},
	
	{"source": "NamedPizza", "target": "Napoletana", "label": "subclassOf"},
	
	{"source": "Napoletana", "target": "NapoletanaCollection", "label": "unionOf"},
	{"source": "NapoletanaCollection", "target": "AnchoviesTopping", "label": "subclassOf"},
	{"source": "NapoletanaCollection", "target": "CaperTopping", "label": "subclassOf"},
	{"source": "NapoletanaCollection", "target": "MozzarellaTopping", "label": "subclassOf"},
	{"source": "NapoletanaCollection", "target": "OliveTopping", "label": "subclassOf"},
	{"source": "NapoletanaCollection", "target": "TomatoTopping", "label": "subclassOf"},

	{"source": "NamedPizza", "target": "Parmense", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "PolloAdAstra", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "PrinceCarlo", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "QuattroFormaggi", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "Rosa", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "Siciliana", "label": "subclassOf"},
	{"source": "NamedPizza", "target": "SloppyGuiseppe", "label": "subclassOf"},
	
	{"source": "NamedPizza", "target": "Soho", "label": "subclassOf"},

	{"source": "Soho", "target": "SohoCollection", "label": "unionOf"},
	{"source": "SohoCollection", "target": "GarlicTopping", "label": "subclassOf"},
	{"source": "SohoCollection", "target": "MozzarellaTopping", "label": "subclassOf"},
	{"source": "SohoCollection", "target": "OliveTopping", "label": "subclassOf"},
	{"source": "SohoCollection", "target": "ParmesanTopping", "label": "subclassOf"},
	{"source": "SohoCollection", "target": "RocketTopping", "label": "subclassOf"},
	{"source": "SohoCollection", "target": "TomatoTopping", "label": "subclassOf"},

	{"source": "NamedPizza", "target": "Veneziana", "label": "subclassOf"},

	{"source": "NonVegetarianPizza", "target": "NonVegetarianPizzaCollection", "label": "unionOf"},
	{"source": "NonVegetarianPizzaCollection", "target": "MeatTopping", "label": "subclassOf"},
	{"source": "NonVegetarianPizzaCollection", "target": "SeafoodTopping", "label": "subclassOf"},

	{"source": "MeatTopping", "target": "SeafoodTopping", "label": "complementOf"},
	{"source": "SeafoodTopping", "target": "MeatTopping", "label": "complementOf"},

	{"source": "NonVegetarianPizza", "target": "VegetarianPizza", "label": "complementOf"},
	{"source": "VegetarianPizza", "target": "NonVegetarianPizza", "label": "complementOf"},

	{"source": "PizzaBase", "target": "DeepPanBase", "label": "subclassOf"},
	{"source": "PizzaBase", "target": "ThinAndCrispyBase", "label": "subclassOf"},

	{"source": "ThinAndCrispyBase", "target": "DeepPanBase", "label": "disjointWith"},
	{"source": "DeepPanBase", "target": "ThinAndCrispyBase", "label": "disjointWith"},
	
	{"source": "PizzaTopping", "target": "CheeseTopping", "label": "subclassOf"},
	{"source": "PizzaTopping", "target": "SeafoodTopping", "label": "subclassOf"},
	{"source": "PizzaTopping", "target": "FruitTopping", "label": "subclassOf"},
	{"source": "PizzaTopping", "target": "HerbSpiceTopping", "label": "subclassOf"},
	{"source": "PizzaTopping", "target": "MeatTopping", "label": "subclassOf"},
	{"source": "PizzaTopping", "target": "NutTopping", "label": "subclassOf"},
	{"source": "PizzaTopping", "target": "SauceTopping", "label": "subclassOf"},
	{"source": "PizzaTopping", "target": "SpicyToppingCollection", "label": "subclassOf"},
	{"source": "PizzaTopping", "target": "VegetableTopping", "label": "subclassOf"},
	{"source": "PizzaTopping", "target": "VegetarianTopping", "label": "subclassOf"},
	
	{"source": "Hot", "target": "SpicyToppingCollection", "label": "subclassOf"},
	{"source": "SpicyToppingCollection", "target": "SpicyTopping", "label": "intersectionOf"},

	{"source": "CheeseTopping", "target": "CheesyVegetableTopping", "label": "subclassOf"},
	{"source": "CheeseTopping", "target": "FourCheesesTopping", "label": "subclassOf"},
	{"source": "CheeseTopping", "target": "GoatsCheeseTopping", "label": "subclassOf"},
	{"source": "CheeseTopping", "target": "GorgonzolaTopping", "label": "subclassOf"},
	{"source": "CheeseTopping", "target": "MozzarellaTopping", "label": "subclassOf"},
	{"source": "CheeseTopping", "target": "ParmesanTopping", "label": "subclassOf"},
	
	{"source": "SeafoodTopping", "target": "AnchoviesTopping", "label": "subclassOf"},
	{"source": "SeafoodTopping", "target": "MixedSeafoodTopping", "label": "subclassOf"},
	{"source": "SeafoodTopping", "target": "PrawnsTopping", "label": "subclassOf"},
	
	{"source": "FruitTopping", "target": "SultanaTopping", "label": "subclassOf"},
	
	{"source": "HerbSpiceTopping", "target": "CajunSpiceTopping", "label": "subclassOf"},
	{"source": "HerbSpiceTopping", "target": "RosemaryTopping", "label": "subclassOf"},
	
	{"source": "RosemaryTopping", "target": "CajunSpiceTopping", "label": "disjointWith"},
	{"source": "CajunSpiceTopping", "target": "RosemaryTopping", "label": "disjointWith"},

	{"source": "MeatTopping", "target": "ChickenTopping", "label": "subclassOf"},
	{"source": "MeatTopping", "target": "HamTopping", "label": "subclassOf"},
	{"source": "MeatTopping", "target": "HotSpicedBeefTopping", "label": "subclassOf"},
	{"source": "MeatTopping", "target": "PeperoniSausageTopping", "label": "subclassOf"},

	{"source": "ChickenTopping", "target": "HamTopping", "label": "disjointWith"},
	{"source": "ChickenTopping", "target": "HotSpicedBeefTopping", "label": "disjointWith"},
	{"source": "ChickenTopping", "target": "PeperoniSausageTopping", "label": "disjointWith"},

	{"source": "HamTopping", "target": "ChickenTopping", "label": "disjointWith"},
	{"source": "HamTopping", "target": "HotSpicedBeefTopping", "label": "disjointWith"},
	{"source": "HamTopping", "target": "PeperoniSausageTopping", "label": "disjointWith"},

	{"source": "HotSpicedBeefTopping", "target": "ChickenTopping", "label": "disjointWith"},
	{"source": "HotSpicedBeefTopping", "target": "HamTopping", "label": "disjointWith"},
	{"source": "HotSpicedBeefTopping", "target": "PeperoniSausageTopping", "label": "disjointWith"},

	{"source": "PeperoniSausageTopping", "target": "ChickenTopping", "label": "disjointWith"},
	{"source": "PeperoniSausageTopping", "target": "HamTopping", "label": "disjointWith"},
	{"source": "PeperoniSausageTopping", "target": "HotSpicedBeefTopping", "label": "disjointWith"},

	{"source": "HamTopping", "target": "ParmaHamTopping", "label": "subclassOf"},
	
	{"source": "NutTopping", "target": "PineKernels", "label": "subclassOf"},
	
	{"source": "SauceTopping", "target": "TobascoPepperSauce", "label": "subclassOf"},
	
	{"source": "VegetableTopping", "target": "ArtichokeTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "AsparagusTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "CaperTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "CheesyVegetableTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "GarlicTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "LeekTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "MushroomTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "OliveTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "OnionTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "PepperTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "PetitPoisTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "RocketTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "SpinachTopping", "label": "subclassOf"},
	{"source": "VegetableTopping", "target": "TomatoTopping", "label": "subclassOf"},
	
	{"source": "OnionTopping", "target": "RedOnionTopping", "label": "subclassOf"},
	
	{"source": "PepperTopping", "target": "GreenPepperTopping", "label": "subclassOf"},
	{"source": "PepperTopping", "target": "JalapenoPepperTopping", "label": "subclassOf"},
	{"source": "PepperTopping", "target": "PeperonataTopping", "label": "subclassOf"},
	{"source": "PepperTopping", "target": "SweetPepperTopping", "label": "subclassOf"},
	
	{"source": "GreenPepperTopping", "target": "HotGreenPepperTopping", "label": "subclassOf"},
	
	{"source": "TomatoTopping", "target": "SlicedTomatoTopping", "label": "subclassOf"},
	{"source": "TomatoTopping", "target": "SundriedTomatoTopping", "label": "subclassOf"},

	{"source": "SundriedTomatoTopping", "target": "SlicedTomatoTopping", "label": "disjointWith"},
	{"source": "SlicedTomatoTopping", "target": "SundriedTomatoTopping", "label": "disjointWith"},

	{"source": "ValuePartition", "target": "Spiciness", "label": "subclassOf"},
	{"source": "Spiciness", "target": "SpicinessCollection", "label": "unionOf"},
	{"source": "SpicinessCollection", "target": "Hot", "label": "subclassOf"},
	{"source": "SpicinessCollection", "target": "Medium", "label": "subclassOf"},
	{"source": "SpicinessCollection", "target": "Mild", "label": "subclassOf"}
]

var w = 1800,
	h = 700,
	root,
	node,
	link,
	nodes,
	original_nodes,
	node_list,
	closed_nodes = [],
	nodes_visited = [],
	links,
	original_links;
	
var hiddenLinks = [];

var force = d3.layout.force()
	.gravity(.10)
	.distance(90)
	.charge(-500)
	.on("tick", tick)
	.size([w, h]);

var vis = d3.select("#chart").append("svg:svg")
	.attr("width", w)
	.attr("height", h);

//leave a node at the same spot once it's been dragged to it
var node_drag = d3.behavior.drag()
.on("dragstart", dragstart)
.on("drag", dragmove)
.on("dragend", dragend);

if (pizzaData && Array.isArray(pizzaData) && pizzaData.length > 0) {
	links = pizzaData;
	node_list = {};
	
	links.forEach(function(link) {
		link.source = node_list[link.source] || (node_list[link.source] = {name: link.source});
		link.target = node_list[link.target] || (node_list[link.target] = {name: link.target});
	});
	original_links = deepCopy(links);
	
	console.log("NODE_LIST: " + node_list);
	original_nodes = Object.values(node_list);
	nodes = [...original_nodes];
	
	//closing all non-leaf nodes
	i = nodes.length-1
	while(i>0)
	{
		n = nodes[i];
		if(hasChildren(n.name))
		{
			childNodesToBeRemoved = removeChildLinks(n.name);
			removeChildNodes(childNodesToBeRemoved);
			updateClosedNodeList(n.name);
		}
		
		i--;
	}
	//end close all
	
	update();
} else {
	pass
	console.error("JSON data is invalid or empty.");
	alert("Error: The JSON data is empty or invalid.");
}


function update() {
	// Restart the force layout.
	force
		.nodes(nodes)
		.links(links)
		.start();

	var svg = d3.select("body").append("svg:svg")
	.attr("width", w)
	.attr("height", h);


	//define marker
	svg.append("svg:defs").selectAll("marker")
		.data(["arrow"])
		.enter().append("svg:marker")
		.attr("id", "arrow")
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", -6)
		.attr("refY", 0)
		.attr("markerWidth", 10)
		.attr("markerHeight", 6)
		.attr("orient", "auto")
		.append("svg:path")
		.attr("d", "M10,-5L0,0L10,5");

	//define highlighted marker
	svg.append("svg:defs").selectAll("marker")
		.data(["highlightedarrow"])
		.enter().append("svg:marker")
		.attr("id", "highlightedarrow")
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", -6)
		.attr("refY", 0)
		.attr("markerWidth", 10)
		.attr("markerHeight", 6)
		.attr("orient", "auto")
		.append("svg:path")
		.attr("d", "M10,-5L0,0L10,5");

	// Update the links
	link = vis.selectAll("line.link")
		.data(links, function(d) { return d.target.id; });

	// Enter any new links.
	link.enter().insert("svg:line", ".node")
		.attr("class", "link")
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; })
		.attr("marker-start", "url(#arrow)"); 

	// Selects the SVG element and add the text separately
	let linkLabels = vis.selectAll(".link-label") // Select existing labels for update
    	.data(links, function(d) { return d.target.id; }); // Use the same data join


	// Add labels to the links (edges) 
	linkLabels.enter().append('svg:text')
		.attr("class", "link-label")
		.attr("x", function(d) { return (d.source.x + d.target.x) / 2; })
		.attr("y", function(d) { return (d.source.y + d.target.y) / 2; })
		.attr("text-anchor", "middle") // Center text horizontally
		.text(function(d) {return d.label || ""; }); 

	linkLabels // Select existing labels and update
		.attr("x", function(d) { return (d.source.x + d.target.x) / 2; }) // Calculate midpoint x
		.attr("y", function(d) { return (d.source.y + d.target.y) / 2; }) // Calculate midpoint y
		.text(function(d) { return d.label || ""; }); // Update text if needed

	linkLabels.exit().remove();
	link.exit().remove();

    // Update existing links (and their labels)
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

	// Exit any old links.
	link.exit().remove();

	node = vis.selectAll("g.node")
		.data(nodes, function(d) {return d.id;});

	nodeEnter = node.enter().append("svg:g")
		.attr("class", "node")   
		.call(node_drag);

	nodeEnter.append("svg:circle")
	.attr("class", "circle")
	.attr("r", 8)
	.on("mouseover", mouseover("#EB3E09", "#f5740a", "#F5250A"))
	.on("mouseout", mouseout("#c6dbef", "9ecae1", "#000000")) 
	.style("fill", color)
	.on("click", click);

	nodeEnter.append("svg:text")
	.attr("class", "nodetext")
	.attr("x", 11)
	.attr("y", 1)
	.text(function(d) { return d.name;})
	.on("click", click);

				
	// Exit any old nodes.
	node.exit().remove();    

	nodeEnter.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });  

	force.on("tick", tick);
}

//Toggle children on click.
function click(d,index) {

if(hasChildren(d.name))
{
	if($.inArray(d.name, closed_nodes) > -1)
	{
		nodes_visited = [];
		addChildLinks(d.name);
	}
	else
	{
		childNodesToBeRemoved = removeChildLinks(d.name);
		removeChildNodes(childNodesToBeRemoved);
	}

	updateClosedNodeList(d.name);
	
	update();
}
	
}

function updateClosedNodeList(id) {
	nodeIndex = $.inArray(id, closed_nodes);

	if(nodeIndex > -1) {
		closed_nodes.splice(nodeIndex,1);
	}
	else
	{
		closed_nodes.push(id);
	}

}

function hasChildren(id)
{
var i = 0;

while (i < original_links.length)
{
	if ((original_links[i].source.name == id))
	{
		return true;
	}
	
	i++;
}

return false;
}

function addChildLinks(id) {
	var i = 0;
	var childNodes = [];
	var childNodesToBeAdded = [];

	while (i < original_links.length) {
		//Find links where the source is the clicked node
		if ((original_links[i].source.name == id)) {
			//Add the child node if it is currently missing
			if(findNode(original_links[i].target.name) < 0)
			{
				nodes.push({name: original_links[i].target.name});
			}
			
			//Add the link between this child and the parent
			if(findLink(original_links[i].source.name, original_links[i].target.name) == -1)
			{
				links.push({source: nodes[findNodeIndex(id)], target: nodes[findNodeIndex(original_links[i].target.name)]});
			}
			
			nodes_visited.push(id);
			
			//Recursively show the child's children
			if($.inArray(original_links[i].target.name, closed_nodes) == -1)
			{	
				//This if statement stops an infinite loop that occurs through cyclic links
				if($.inArray(original_links[i].target.name, nodes_visited) == -1)
				{
					addChildLinks(original_links[i].target.name);
				}
				//else
				//{
				//	alert('Been to ' + original_links[i].target.name + ' already!')
				//}
			}
		} 
		i++;
	}

	// Add labels to the new links
    for (let i = 0; i < original_links.length; i++) {
        if (original_links[i].source.name === id) {
            if (findLink(original_links[i].source.name, original_links[i].target.name) == -1) {
                let sourceNode = nodes[findNodeIndex(id)];
                let targetNode = nodes[findNodeIndex(original_links[i].target.name)];

                let newLink = {
                    source: sourceNode,
                    target: targetNode,
                    label: original_links[i].label // Get the label from original_links
                };
                links.push(newLink);
            }
        }
    }
}


function removeChildLinks(id) {
var i = 0;
var n = findNode(id);
var childNodes = [];
var childNodesToBeRemoved = [];

//Getting the child nodes
while (i < links.length)
{
	if ((links[i].source == n))
	{
		childNodes.push(links[i].target.name);
	} 
	i++;
}

//Removing links between parent and children
j = links.length-1;
while (j > -1)
{
	if ($.inArray(links[j].target.name, childNodes) > -1 && links[j].source==n)
	{
		links.splice(j,1);
	}
	j--;
}

//Checking what child nodes should be removed
i=childNodes.length-1
while(i>-1)
{
	otherLinks = 0;

	j = 0;
	while (j < links.length)
	{
		if ((links[j].target.name == childNodes[i]))
		{
			otherLinks++;
		} 
		j++;
	}

	if(otherLinks==0)
	{
		childNodesToBeRemoved.push(childNodes[i]);
		childNodesToBeRemoved = childNodesToBeRemoved.concat(removeChildLinks(childNodes[i]).slice());
	}

	i--;
}

return childNodesToBeRemoved;
}

function removeChildNodes(childNodesToBeRemoved)
{
//Removing nodes
j = nodes.length-1;
while (j > -1)
{
	if ($.inArray(nodes[j].name, childNodesToBeRemoved) > -1)
	{
		nodes.splice(j,1);
	}
	j--;
}
update();
};

function findNode(id)
{
for (var i in nodes)
{
	if (nodes[i].name === id) return nodes[i];
};

return -1;
};

function findNodeIndex(id) {
for (var i=0;i<nodes.length;i++)
{
	if (nodes[i].name==id)
	{
		return i;
	}
};
};

function findLink(source, target)
{
for (var i in links)
{
	if (links[i].source == source && links[i].target == target)
	{
		return links[i];
	}
};

return -1;
};

function tick() {	
	// Update link label positions
	vis.selectAll(".link-label")
		.attr("x", function(d) { return (d.source.x + d.target.x) / 2; }) // Calculate midpoint x
		.attr("y", function(d) { return (d.source.y + d.target.y) / 2; }) // Calculate midpoint y
    
	// Update the link positions
	link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });

	// Update the node positions
	node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });     
}

//color nodes that can be expanded dark blue and those that cannot light blue.
function color(d) {
if($.inArray(d.name, closed_nodes) > -1)
{
return "#3182bd";
}
else
{
return "#c6dbef";
}
}

function mouseover(circleFill, lineFill, textFill){
return function(d, i){
	
	xPos=d.x;
	yPos=d.y;		 
		
	var node = d3.select(this)
		.style("fill", circleFill)
		.style("fill-opacity", 1)
		.style("stroke-opacity", 1);
	
	//highlights the node that is being moused over
	var text = d3.selectAll("text")
		.filter(function(g, i){return g.x==d.x})
		.style("fill", circleFill)

	var adjacentLinks = d3.selectAll("line.link")
		.filter(function(d, i) { return d.source.x==xPos && d.source.y==yPos;})
		.style("stroke-opacity", 1)
		.style("stroke", "#f5740a")
		.attr("marker-start", "url(#highlightedarrow)")
		.each(function(d){
			d3.selectAll("circle")
			.filter(function(g, i){return d.target.x==g.x && d.target.y==g.y;})
			.style("fill-opacity", 1)
			.style("stroke-opacity", 1)
			.style("fill", "#F5250A")
			.each(function(d){
				d3.selectAll("text")
					.filter(function(g, i){return g.x==d.x})
					.style("fill", "#F5250A")
					
			});
	
	});
				
		

};

}

function mouseout(circleFill, lineFill, textFill){
return function(d, i){
	d3.selectAll("circle")
		.style("fill", color)
		.style("fill-opacity", .75)
		.style("stroke-opacity", 1);
	
	d3.selectAll("line")
		.style("stroke", lineFill)
		.style("stroke-opacity", .75)
		.attr("marker-start", "url(#arrow)"); 
	
	//d3.selectAll("marker")
		//.style("fill", lineFill);
	
	d3.selectAll("text").style("fill", "000");
};
}

function dragstart(d, i) {
force.stop() // stops the force auto positioning before you start dragging
}

function dragmove(d, i) {
d.px += d3.event.dx;
d.py += d3.event.dy;
d.x += d3.event.dx;
d.y += d3.event.dy; 
tick(); // this is the key to make it work together with updating both px,py,x,y on d !
}

function dragend(d, i) {
d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
tick();
force.resume();
}

function deepCopy(obj) {
if (Object.prototype.toString.call(obj) === '[object Array]') {
	var out = [], i = 0, len = obj.length;
	for ( ; i < len; i++ ) {
		out[i] = arguments.callee(obj[i]);
	}
	return out;
}
if (typeof obj === 'object') {
	var out = {}, i;
	for ( i in obj ) {
		out[i] = arguments.callee(obj[i]);
	}
	return out;
}
return obj;
}