const MusicBaselineData = {
  "nodes": [
    {"id": "Music Drama", "group": 1},
    {"id": "Opereta", "group": 2},
    {"id": "Opera", "group": 2},
    {"id": "Musical", "group": 2},
    {"id": "Tosca", "group": 4},
    {"id": "Turanda", "group": 4},
    {"id": "Salome", "group": 4},
    {"id": "Set A", "group": 3},
    {"id": "Set B", "group": 3}
  ],
  
  "links": [
    {"source": "Opereta", "target": "Music Drama", "value": "subClassOf", "label": "subClassOf"},
    {"source": "Opera", "target": "Music Drama", "value": "subClassOf", "label": "subClassOf"},
    {"source": "Musical", "target": "Music Drama", "value": "subClassOf", "label": "subClassOf"},

    {"source": "Opereta", "target": "Opera", "value": "disjointWith", "label": "disjointWith"},
    {"source": "Opereta", "target": "Musical", "value": "disjointWith", "label": "disjointWith"},

    {"source": "Musical", "target": "Opera", "value": "disjointWith", "label": "disjointWith"},
    {"source": "Musical", "target": "Opereta", "value": "disjointWith", "label": "disjointWith"},

    {"source": "Opera", "target": "Musical", "value": "disjointWith", "label": "disjointWith"},
    {"source": "Opera", "target": "Opereta", "value": "disjointWith", "label": "disjointWith"},


    {"source": "Set A", "target": "Opera", "value": "subClassOf", "label": "subClassOf"},
    {"source": "Set B", "target": "Opera", "value": "subClassOf", "label": "subClassOf"},

    {"source": "Salome", "target": "Set A", "value": "subClassOf", "label": "subClassOf"},
    {"source": "Tosca", "target": "Set A", "value": "subClassOf", "label": "subClassOf"},

    {"source": "Turanda", "target": "Set B", "value": "subClassOf", "label": "subClassOf"},
    {"source": "Tosca", "target": "Set B", "value": "subClassOf", "label": "subClassOf"}
  ]
}
  