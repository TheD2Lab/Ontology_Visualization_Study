function treeMap() {
      // Specify the chart’s dimensions.
  const width = 1800;
  const height = 700;


  //embedded the data
const data = {
name: "owl:PizzaOntology", x: 0, y: 0, width: 1, height: 1,
children: [
{name: "Thing", value: 100, color: "#9B6F96", x: 0, y: 0, width: 1, height: 1,
children: [
{name: "DomainConcept", value:1000, color: "#3A5A83",  x: 0, y: 0, width: 1, height: 0.85,
children: [
  {name: "Country", value: 50, color: "#000080", x: 0, y: 0, width: 1, height: 0.1},
  {name: "", value: 10, color: "#D94F4F",  x: 0, y: 1, width: 1, height: 0.10},
  {name: "Food", value: 100, color: "#D9EFF9", x: 0.5, y: 1, width: 1, height: 0.9,
      children: [
          {name: "", value: 10, color: "#D94F4F",  x: 0, y: 1, width: 1, height: 0.15},
          {name: "IceCream", value: 50, color: "beige", x: 0, y: 0, width: 1, height: 0.1}, 
          {name: "PizzaBase", value: 100, color: "#ADD8E4", x: 0, y: 0.17, width: 0.45, height: 0.4,
              children: [
                  {name: "", value: 10, color: "#A78C6B",  x: 1, y: 1, width: 0.2, height: 1},
                  {name: "DeepPanBase", value: 50, color: "#9BB8C9", x: 0, y: 0, width: 0.5, height: 1},
                  {name: "ThinAndCrispyBase", value: 100, color: "#E6F3FC", x: 1, y: 1, width: 0.5, height: 1,
                  children: [
                      {name: "ThinAndCrispyPizza", value: 50, color: "#7A6E5E", x: 0, y: 0, width: 1, height: 1}
                  ]},
          ]},
          {name: "PizzaTopping", value: 100, color: "#A8D5BA",  x: 0, y: 1, width: 0.5, height: 0.5,
              children: [
                  {name: "HerbSpiceTopping", value: 100, color: "#B8D9C3",  x: 0, y: 0, width: 0.3, height: 0.2,
                  children: [
                      {name: "CajunSpiceTopping", value: 100, color: "#D0E3D4",  x: 0, y: 0, width: 0.5, height: 1},
                      {name: "RosemaryTopping", value: 100, color: "#E2F1E6",  x: 1, y: 1, width: 0.5, height: 1}  
                  ]},
                  {name: "NutTopping", value: 100, color: "#C9E4C5",  x: 0, y: 0.25, width: 0.3, height: 0.2,
                  children: [
                      {name: "PineKernelTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0, width: 1, height: 1}
                  ]},
                  {name: "SauceTopping", value: 100, color: "#B8D9C3",  x: 0, y: 0.5, width: 0.3, height: 0.2,
                  children: [
                      {name: "TobascoPepperSauceTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0, width: 1, height: 1}
                  ]},
                  {name: "FruitTopping", value: 100, color: "#C9E4C5",  x: 0, y: 0.75, width: 0.3, height: 0.2,
                  children: [
                      {name: "SultanaTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0, width: 1, height: 1}
                  ]},

                {name: "", value: 10, color: "#B07B65",  x: 1, y: 1, width: 0.3, height: 1},
                
                  {name: "MeatTopping", value: 100, color: "#B8D9C3",  x: 1, y: 0, width: 0.7, height: 0.152,
                  children: [
                      {name: "ChickenTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0, width: 0.5, height: 0.2},
                      {name: "HamTopping", value: 100, color: "#F7FBF7",  x: 0, y: 0.5, width: 0.5, height: 0.6,
                          children: [
                              {name: "ParmaHamTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0, width: 1, height: 1}
                          ]
                      },
                      {name: "HotSpicedBeefTopping", value: 100, color: "#E2F1E6",  x: 0, y: 1, width: 0.5, height: 0.2},

                      {name: "", value: 10, color: "#B07B65",  x: 1, y: 1, width: 0.3, height: 0.5},
                      {name: "PeperoniSausageTopping", value: 100, color: "#E2F1E6",  x: 1, y: 1, width: 0.5, height: 0.5},

                      {name: "MeatyPizza", value: 100, color: "#B07B65",  x: 1, y: 0, width: 0.5, height: 0.5}
                  ]},
                  {name: "SeafoodTopping", value: 100, color: "#C9E4C5",  x: 1, y: 0.18, width: 0.7, height: 0.15,
                  children: [
                    {name: "", value: 10, color: "#B07B65",  x: 1, y: 1, width: 0.3, height: 1},
                      {name: "AnchoviesTopping", value: 100, color: "#E2F1E6",  x: 1, y: 0, width: 0.5, height: 0.5},
                      {name: "MixedSeafoodTopping", value: 100, color: "#E2F1E6",  x: 1, y: 1, width: 0.5, height: 0.5},
                      {name: "PrawnsTopping", value: 100, color: "#F7FBF7",  x: 0, y: 0, width: 0.5, height: 1}
                  ]},
                  {name: "VegetableTopping", value: 100, color: "#B8D9C3",  x: 1, y: 0.375, width: 0.7, height: 0.19,
                  children: [
                      {name: "", value: 10, color: "#B07B65",  x: 1, y: 1, width: 0.3, height: 1},
                    
                      {name: "ArtichokeTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0, width: 0.5, height: 0.1},
                      {name: "AsparagusTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.11, width: 0.5, height: 0.1},
                    
                      {name: "CaperTopping", value: 100, color: "#E2F1E6",  x: 1, y: 0, width: 0.5, height: 0.2},
                    
                      {name: "CheesyVegetableTopping", value: 100, color: "#E2F1E6",  x: 0, y: 1, width: 0.5, height: 0.1},
                    
                    {name: "GarlicTopping", value: 100, color: "#E2F1E6",  x: 1, y: 0.25, width: 0.5, height: 0.2},
                      {name: "LeekTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.448, width: 0.5, height: 0.1},
                      {name: "MushroomTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.56, width: 0.5, height: 0.1},
                      {name: "OliveTopping", value: 100, color: "#E2F1E6",  x: 1, y: 0.5, width: 0.5, height: 0.2},
                      {name: "OnionTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.67, width: 0.5, height: 0.1,
                          children: [
                              {name: "RedOnionTopping", value: 100, color: "#F7FBF7",  x: 0, y: 0, width: 1, height: 1}
                          ]
                      },
                      {name: "PepperTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.25, width: 0.5, height: 0.2,
                          children: [
                              {name: "GreenPepperTopping", value: 100, color: "#F7FBF7",  x: 1, y: 1, width: 0.5, height: 0.5,
                                  children: [
                                      {name: "HotGreenPepperTopping", value: 100, color: "#A9A9A9",  x: 0, y: 0, width: 1, height: 1}
                              ]},
                              {name: "JalepenoPepperTopping", value: 100, color: "#F7FBF7",  x: 0, y: 0, width: 0.5, height: 0.5},
                              {name: "PeperonataTopping", value: 100, color: "#F7FBF7",  x: 1, y: 0, width: 0.5, height: 0.5},
                              {name: "SweetPepperTopping", value: 100, color: "#F7FBF7",  x: 0, y: 1, width: 0.5, height: 0.5}
                          ]},
                      {name: "PetitPoisTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.78, width: 0.5, height: 0.1},
                      {name: "RocketTopping", value: 100, color: "#E2F1E6",  x: 1, y: 0.75, width:0.5, height: 0.2},
                      {name: "SpinachTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.89, width: 0.5, height: 0.1},
                      {name: "TomatoTopping", value: 100, color: "#E2F1E6",  x: 1, y: 1, width: 0.5, height: 0.2,
                          children: [
                              {name: "SlicedTomatoTopping", value: 100, color: "#A9A9A9",  x: 1, y: 1, width: 0.5, height: 1},
                              {name: "SundriedTomatoTopping", value: 100, color: "#A9A9A9",  x: 0, y: 0, width: 0.5, height: 1}
                          ]
                      }
                  ]},
                  {name: "CheeseTopping", value: 100, color: "#C9E4C5",  x: 1, y: 0.58, width: 0.7, height: 0.15,
                  children: [
                      {name: "CheesyVegetableTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0, width: 0.5, height: 0.3},
                      {name: "FourCheesesTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.429, width: 0.5, height: 0.3},
                      {name: "GoatsCheeseTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.75, width: 0.5, height: 0.2},
                      {name: "GorgonzolaTopping", value: 100, color: "#E2F1E6",  x: 0, y: 1, width: 0.5, height: 0.2},

                    
                      {name: "", value: 10, color: "#B07B65",  x: 1, y: 0, width: 0.3, height: 0.7},
                    
                      {name: "MozzarellaTopping", value: 100, color: "#E2F1E6",  x: 1, y: 0, width: 0.5, height: 0.4},
                      {name: "ParmesanTopping", value: 100, color: "#E2F1E6",  x: 1, y: 0.57, width: 0.5, height: 0.3},

                      {name: "CheesyPizza", value: 100, color: "#B07B65",  x: 1, y: 1, width: 0.5, height: 0.3}
                      ]
                  },

                  {name: "VegetarianTopping", value: 100,  color: "#B8D9C3",  x: 1, y: 0.76, width: 0.7, height: 0.15,
                      children: [
                          {name: "VegetarianPizza1", value: 100, color: "#B07B65",  x: 0, y: 0, width: 1, height: 1}
                      ]
                  },
                  {name: "", value: 10, color: "#D94F4F",  x: 0, y: 1, width: 1, height: 0.1},
                
                  {name: "SpicyTopping", value: 100, color: "#B8D9C3",  x: 1, y: 1, width: 1, height: 0.2,
                  children: [
                      {name: "SpicyPizza", value: 100, color: "#B07B65",  x: 0, y: 0, width: 1, height: 1}
                  ]}
              ]
          },
          {name: "Pizza", value: 100, color: "#A78C6B",  x: 1, y: 1, width: 0.7, height: 0.9,
              children: [
                  {name: "", value: 10, color: "#D94F4F",  x: 1, y: 1, width: 1, height: 0.05},
                  
                  {name: "", value: 10, color: "#ADD8E4",  x: 0, y: 0, width: 0.15, height: 0.1},
                  {name: "ThinAndCrispyPizza", value: 10, color: "#7A6E5E",  x: 0, y: 0, width: 0.5, height: 0.1},

                  {name: "UnclosedPizza", value: 10, color: "#D1A38D",  x: 1, y: 0, width: 0.5, height: 0.1},
                  {name: "InterestingPizza", value: 10, color: "#D1A38D",  x: 1, y: 0.12, width: 0.5, height: 0.2},   
                  {name: "RealItalianPizza", value: 10, color: "#D1A38D",  x: 1, y: 0.37, width: 0.5, height: 0.2},
                  {name: "VegetarianPizza2", value: 10, color: "#B07B65",  x: 1, y: 0.62, width: 0.5, height: 0.2},
                  {name: "VegetarianPizza", value: 10, color: "#D1A38D",  x: 1, y: 0.87, width: 0.5, height: 0.2},

                  {name: "", value: 10, color: "#A8D5BA",  x: 0, y: 0.968, width: 0.25, height: 0.9},
                  {name: "NonVegetarianPizza", value: 100, color: "#C0856D",  x: 0, y: 0.11, width: 0.5, height: 0.1,
                      children: [
                          {name: "MeatTopping", value: 100, color: "#C9E4C5",  x: 0, y: 0, width: 1, height: 0.5},
                          {name: "SeafoodTopping", value: 100, color: "#C9E4C5",  x: 1, y: 1, width: 1, height: 0.5}
                      ]
                  },
                  {name: "MeatyPizza", value: 10, color: "#B07B65",  x: 0, y: 0.22, width: 0.5, height: 0.1},
                  {name: "NamedPizza", value: 50, color: "#B07B65",  x: 0, y: 0.5, width: 0.5, height: 0.4,
                      children: [
                          {name: "", value: 10, color: "#A8D5BA",  x: 0, y: 1, width: 0.25, height: 1},
                          {name: "American", value: 100, color: "#E4B29F",  x: 0, y: 0.75, width: 0.5, height: 0.2,
                              children: [
                                  {name: "MozzarellaTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0, width: 1, height: 0.3},
                                  {name: "PeperoniSausageTopping", value: 100, color: "#E2F1E6 ",  x: 0, y: 0.5, width: 1, height: 0.4},
                                  {name: "TomatoTopping", value: 100, color: "#E2F1E6 ",  x: 0, y: 1, width: 1, height: 0.3}
                              ]
                          },              
                        
                          {name: "AmericanHot", value: 100, color: "#E4B29F",  x: 1, y: 0.15, width: 0.5, height: 0.05},
                          {name: "Cajun", value: 100, color: "#E4B29F",  x: 1, y: 0.35, width: 0.5, height: 0.05},
                          {name: "Capricciosa", value: 100, color: "#E4B29F",  x: 1, y: 0.45, width: 0.5, height: 0.05},
                          {name: "Caprina", value: 100, color: "#E4B29F",  x: 1, y: 0.55, width: 0.5, height: 0.05},
                          {name: "Fiorentina", value: 100, color: "#E4B29F",  x: 1, y: 0.65, width: 0.5, height: 0.05},
                          {name: "FourSeasons", value: 100, color: "#E4B29F",  x: 1, y: 0.75, width: 0.5, height: 0.05},  
                        
                          {name: "FruittiDiMare", value: 100, color: "#E9C0A6",  x: 0, y: 0, width: 0.5, height: 0.2,
                              children: [
                                  {name: "GarlicTopping", value: 100, color: "#E2F1E6 ",  x: 0, y: 0, width: 1, height: 0.3},
                                  {name: "MixedSeafoodTopping", value: 100, color: "#E2F1E6 ",  x: 0, y: 0.5, width: 1, height: 0.4},
                                  {name: "TomatoTopping", value: 100, color: "#E2F1E6 ",  x: 0, y: 1, width: 1, height: 0.3}
                              ]
                          },
                        
                          {name: "Giardiniera", value: 100, color: "#E4B29F",  x: 1, y: 0.95, width: 0.5, height: 0.05},
                          {name: "LaReine", value: 100, color: "#E4B29F",  x: 1, y: 1, width: 0.5, height: 0.05},
                        
                        {name: "Margherita", value: 100, color: "#E9C0A6",  x: 0, y: 0.25, width: 0.5, height: 0.2,
                          children: [
                              {name: "MozzarellaTopping", value: 100, color: "#E2F1E6 ",  x: 0, y: 0, width: 1, height: 0.5},
                              {name: "TomatoTopping", value: 100, color: "#E2F1E6 ",  x:1 , y: 1, width: 1, height: 0.5}
                          ]},
                        
                        {name: "Mushroom", value: 100, color: "#E4B29F",  x: 1, y: 0.21, width: 0.5, height: 0.1},
                        
                        {name: "Napoletana", value: 100, color: "#F1D6B4",  x: 0, y: 0.5, width: 0.5, height: 0.2,
                          children: [
                              {name: "AnchoviesTopping", value: 100, color: "#E2F1E6 ",  x: 0, y: 0, width: 1, height: 0.2},
                              {name: "CaperTopping", value: 100, color: "#E2F1E6 ",  x: 0, y: 0.25, width: 1, height: 0.2},
                              {name: "MozzarellaTopping", value: 100, color: "#E2F1E6 ",  x: 0, y: 0.5, width: 1, height: 0.2},
                              {name: "OliveTopping", value: 100, color: "#E2F1E6 ",  x: 0, y: 0.75, width: 1, height: 0.2},
                              {name: "TomatoTopping", value: 100, color: "#E2F1E6 ",  x: 1, y: 1, width: 1, height: 0.2}
                          ]},
                        
                        {name: "Parmense", value: 100, color: "#E4B29F",  x: 1, y: 0.3, width: 0.5, height: 0.05},
                        {name: "PolloAdAstra", value: 100, color: "#E4B29F",  x: 1, y: 0.4, width: 0.5, height: 0.05},
                        {name: "PrinceCarlo", value: 100, color: "#E4B29F",  x: 1, y: 0.5, width: 0.5, height: 0.05},
                        {name: "QuattroFormaggi", value: 100, color: "#E4B29F", x: 1, y: 0.6, width: 0.5, height: 0.05},
                        {name: "Rosa", value: 100, color: "#E4B29F",  x: 1, y: 0.7, width: 0.5, height: 0.05},
                        {name: "Siciliana", value: 100, color: "#E4B29F",  x: 1, y: 0.845, width: 0.5, height: 0.1},
                        {name: "SloppyGiuseppe", value: 100, color: "#E4B29F",  x: 1, y: 0.9, width: 0.5, height: 0.05},
                        
                        {name: "Soho", value: 100, color: "#E9C0A6",  x: 0, y: 1, width: 0.5, height: 0.2,
                          children: [
                              {name: "GarlicTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0, width: 1, height: 0.2},
                              {name: "MozzarellaTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.22, width: 1, height: 0.1},
                              {name: "OliveTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.379, width: 1, height: 0.2},
                              {name: "ParmesanTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.56, width: 1, height: 0.1},
                              {name: "RocketTopping", value: 100, color: "#E2F1E6",  x: 0, y: 0.75, width: 1, height: 0.2},
                              {name: "TomatoTopping", value: 100, color: "#E2F1E6",  x: 0, y: 1, width: 1, height: 0.2}
                          ]},
                        
                        {name: "Veneziana", value: 100, color: "#E4B29F",  x: 1, y: 0, width: 0.5, height: 0.145}
                  ]},

                  {name: "CheesyPizza", value: 10, color: "#B07B65",  x: 0, y: 0.78, width: 0.5, height: 0.1},
                  {name: "VegetarianPizza1", value: 10, color: "#E4C29F",  x: 0, y: 0.89, width: 0.5, height: 0.1},
                  {name: "SpicyPizza", value: 10, color: "#B07B65",  x: 0, y: 1, width: 1, height: 0.1}
              ]
          }
      ]
  }
]},
{name: "ValuePartition", value: 100, color: "#D94F4F",  x: 0, y: 1, width: 1, height: 0.2,
  children: [
    {name: "", value: 10, color: "#3A5A83",  x: 0, y: 0, width: 1, height: 0.2},
    {name: "Spiciness", value: 100, color: "#F0A27B",  x: 0, y: 0, width: 1, height: 1,
        children: [
          {name: "", value: 10, color: "#3A5A83",  x: 0, y: 0, width: 1, height: 0.1},
          {name: "Hot", value: 100, color: "#F9E5A3",  x: 0, y: 0, width: 1, height: 0.5,
              children: [
                  {name: "SpicyTopping", value: 100, color: "#B8D9C3",  x: 0, y: 0, width: 1, height: 1,
                  children: [
                      {name: "SpicyPizza", value: 100, color: "#B07B65",  x: 0, y: 0, width: 1, height: 1}
                  ]}
              ]
          },
          {name: "Medium", value: 100, color: "#F9E5A3",  x: 0, y: 1, width: 0.5, height: 0.5},
          {name: "Mild", value: 100, color: "#F9E5A3",  x: 1, y: 1, width: 0.5, height: 0.5}
        ]
    }
  ]
}
]
}    
]   
}


          
function tile(node, x0, y0, x1, y1) {
    if (!node.children || node.children.length === 0) return;

    node.children.forEach(child => {
        const childWidth = (child.data.width || 0.2) * (x1 - x0);
        const childHeight = (child.data.height || 0.2) * (y1 - y0);

        let childX, childY;

        if (child.data.x !== undefined && child.data.y !== undefined) {
            childX = x0 + child.data.x * (x1 - x0 - childWidth);
            childY = y0 + child.data.y * (y1 - y0 - childHeight);
        } else {
            // Deterministic position generation
            const hash = stringToHash(child.data.name);
            const randomX = (hash & 0xFF) / 255; // Use lower 8 bits for x
            const randomY = ((hash >> 8) & 0xFF) / 255; // Use next 8 bits for y

            childX = x0 + randomX * (x1 - x0 - childWidth);
            childY = y0 + randomY * (y1 - y0 - childHeight);
        }

        child.x0 = childX;
        child.y0 = childY;
        child.x1 = childX + childWidth;
        child.y1 = childY + childHeight;

        if (child.children && child.children.length > 0) {
            tile(child, child.x0, child.y0, child.x1, child.y1);
        }
    });
}

const uid = (() => {
  let count = 0;
  return (prefix) => `${prefix}-${count++}`;
})();

// Simple string to hash function
function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
  // Compute the layout.
  const hierarchy = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => a.data.index - b.data.index);
  const root = d3.treemap().tile(tile)(hierarchy);

  // Create the scales.
  const x = d3.scaleLinear().rangeRound([0, width]);
  const y = d3.scaleLinear().rangeRound([0, height]);

  // Formatting utilities.
  const format = d3.format(",d");

  const name = d => {
    if (!d.data.name) {
      if (d.children && d.children.length > 0) {
        const childNames = d.children
          .map(child => child.data.name)
          .filter(name => name)
          .join("&");
        const newName = d.ancestors().reverse().map(d => d.data.name).join(`/${childNames}`);
        return newName;
      } else {
        return "";
      }
    }
    return d.ancestors().reverse().map(d => d.data.name).join("/");
  };

const color = d3.scaleOrdinal()
    .domain(Array.from(new Set(root.leaves().map(d => d.data.color || "brown"))))
    .range(Array.from(new Set(root.leaves().map(d => d.data.color || "brown"))));

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("viewBox", [0.5, -30.5, width, height + 30])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto;")
    .style("font", "10px sans-serif");

  // Display the root.
  let group = svg.append("g")
    .call(render, root);

  function render(group, root) {
    const node = group
      .selectAll("g")
      .data(root.children.concat(root))
      .join("g");

    node.filter(d => d === root ? d.parent : d.children)
      .attr("cursor", "pointer")
      .on("click", (event, d) => d === root ? zoomout(root) : zoomin(d));

    node.append("title")
      .text(d => `${name(d)}/${format(d.value)}`);

    node.append("rect")
      .attr("cursor", "pointer")
      .attr("id", d => (d.leafUid = uid("leaf")).id)
      .attr("fill", d => d === root ? "grey" : d.data.color || "lightblue")
      
      .attr("fill-opacity", 0.65) // Opacity of the fill
      .attr("stroke", "#fff")
      
      .on("mouseover", function(event, d) { d3.select(this).attr("stroke", "#000");
        d3.select(this).attr("stroke-width", 0.8);})
    .on("mouseout", function() { d3.select(this).attr("stroke", null); });;

    node.append("clipPath")
      .attr("id", d => (d.clipUid = uid("clip")).id)
      .append("use")
      .attr("xlink:href", d => d.leafUid.href);

    node.append("text")
      .attr("clip-path", d => d.clipUid)
      .attr("font-weight", d => d === root ? "bold" : null)
      .selectAll("tspan")
      .data(d => {
        let childrenCount = 0;
        if (d.children) {
          d.children.forEach(child => {
            if (child.data.name != "") {
              childrenCount++;
            }
          });
        }
        let text;
        if (d === root) {
          text = `${name(d)} (${childrenCount})`;
        } else if (d.data.name == "") {
          text = '';
        } else {
          text = `${d.data.name} (${childrenCount})`;
        }
        return text;
      })
      .join("tspan")
      .attr("x", d => { d === root ? ((d, i, nodes) => `${(i === nodes.length - 1.2) * 0.7 + 1.1 + i * 1.9}em`) : 5 })
      .attr("y", 15)
      .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
      .attr("font-weight", (d, i, nodes) => i === nodes.length - 1 ? "normal" : null)
      .attr("dy", "0.35em")
      .text(d => d);

    group.call(position, root);
  }

  function position(group, root) {
    group.selectAll("g")
      .attr("transform", d => d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`)
      .select("rect")
      .attr("width", d => d === root ? width : x(d.x1) - x(d.x0))
      .attr("height", d => d === root ? 30 : y(d.y1) - y(d.y0));
  }

  // When zooming in, draw the new nodes on top, and fade them in.
  function zoomin(d) {
    const group0 = group.attr("pointer-events", "none");
    const group1 = group = svg.append("g").call(render, d);

    x.domain([d.x0, d.x1]);
    y.domain([d.y0, d.y1]);

    svg.transition()
      .duration(50)
      .call(t => group0.transition(t).remove()
        .call(position, d.parent))
      .call(t => group1.transition(t)
        .attrTween("opacity", () => d3.interpolate(0, 1))
        .call(position, d));
  }

  // When zooming out, draw the old nodes on top, and fade them out.
  function zoomout(d) {
    const group0 = group.attr("pointer-events", "none");
    const group1 = group = svg.insert("g", "*").call(render, d.parent);

    x.domain([d.parent.x0, d.parent.x1]);
    y.domain([d.parent.y0, d.parent.y1]);

    svg.transition()
      .duration(50)
      .call(t => group0.transition(t).remove()
        .attrTween("opacity", () => d3.interpolate(1, 0))
        .call(position, d))
      .call(t => group1.transition(t)
        .call(position, d.parent));
  }

  return svg.node();
}