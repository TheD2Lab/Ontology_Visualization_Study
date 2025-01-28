const RestaurantBaselineData = {
    "nodes": [
      {"id": "Restaurant\nItems", "group": 1},
      {"id": "Standard\nOption", "group": 2},
      {"id": "Vegetarian\nOption", "group": 2},
      {"id": "Sandwich", "group": 3}
    ],
    "links": [
      {"source": "Standard\nOption", "target": "Restaurant\nItems", "value": "subClassOf", "label": "subClassOf"},
      {"source": "Vegetarian\nOption", "target": "Restaurant\nItems", "value": "subClassOf", "label": "subClassOf"},

      {"source": "Standard\nOption", "target": "Vegetarian\nOption", "value": "complementOf", "label": "complementOf"},
      {"source": "Vegetarian\nOption", "target": "Standard\nOption", "value": "complementOf", "label": "complementOf"},

      {"source": "Sandwich", "target": "Restaurant\nItems", "value": "subClassOf", "label": "subClassOf"}
    ]
}
  