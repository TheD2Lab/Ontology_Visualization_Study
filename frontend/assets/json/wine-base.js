const tutorialWineBaseline = {
    "nodes": [
      {"id": "Wine", "group": 3},
      {"id": "WhiteWine", "group": 1},
      {"id": "White", "group": 3},
      {"id": "hasColor", "group": 3},
      {"id": "Collection", "group": 2}
    ],
    
    "links": [
      {"source": "Collection", "target": "Wine", "value": "subClassOf", "label": "subClassOf"},
      {"source": "Collection", "target": "White", "value": "hasColor", "label": "hasColor"},
      {"source": "Collection", "target": "hasColor", "value": "onProperty", "label": "onProperty"},
      {"source": "WhiteWine", "target": "Collection", "value": "intersectionOf", "label": "intersectionOf"}
    ]
  }