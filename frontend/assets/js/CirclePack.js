function circlePack(data) {
    // visual dimension
    const width = 2528;
    const height = width;
    

    // Compute the layout and modified pack function to accept pre-defined positions and radii
    const pack = (data, positions, width, height) => {
        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
    
        if (positions) {
            // Use pre-defined positions if available
            root.descendants().forEach((node, i) => {
                if (positions[i]) {
                    node.x = positions[i].x;
                    node.y = positions[i].y;
                    node.r = positions[i].r;
                }
            });
        } else {
            // Otherwise, use d3.pack for layout
            const packLayout = d3.pack()
                .size([width, height])
                .padding(13);
            
            packLayout(root); // Apply the layout to the hierarchy
        }
    
        return root;
    };

        // pre-defined positions 
    const preDefinedPositions = [
        {"name": "a", "value": 40, x: -50, y: -130, r: 520 },      // root, container for visual
        {"name": "", "value": 50, x: -50, y: -130, r: 510},  // thing
        {"name": "", "value": 10, x: -30, y: -180, r: 450 },   // domain 
        {"name": "", "value": 10, x: -150, y: 210, r: 138 }, // value
        
        {"name": "", "value": 10, x: -55, y: -125, r: 380},  // food
        {"name": "", "value": 10, x: 75, y: -550, r: 50 },   // country
        
        {"name": "", "value": 10,  x: -150, y: 195, r: 120 },  // spiciness
        
        {"name": "", "value": 10, x: 20, y: -70, r: 275 }, // pizza
        {"name": "", "value": 10, x: -182, y: -65, r: 235 },  //topping
        {"name": "", "value": 10, x: 135, y: -330, r: 80 },   //base
        {"name": "", "value": 10, x: -195, y: -365, r: 25 },   // icecream
        
        {"name": "", "value": 10, x: -130, y: 155, r: 75 },   // hot
        {"name": "", "value": 10, x: -205, y: 265, r: 25 },   //med
        {"name": "", "value": 10, x: -140, y: 275, r: 25 },   //mild

        //pizza inside
        {"name": "", "value": 10, x: -50, y: -120, r: 185 }, //named
        {"name": "", "value": 10, x: -70, y: -200, r: 100 }, //nonvege
        {"name": "", "value": 10, x: 235, y: 10, r: 25}, //unclosed
        {"name": "", "value": 10, x: -230, y: -20, r: 15 },   //cheesy !!
        {"name": "", "value": 10, x: 215, y: 65, r: 25 },   //interest
        {"name": "", "value": 10, x: -70, y: -180, r: 10 }, //meaty !!
        {"name": "", "value": 10, x: 200, y: -220, r: 25 },  //real
        {"name": "", "value": 10, x: -128, y: 115, r: 25 }, //spicypizza
        {"name": "", "value": 10,  x: 115, y: -300, r: 25 },  //thin !!
        {"name": "", "value": 10, x: 230, y: -150, r: 25 },  //vege
        {"name": "", "value": 10, x: -190, y: 40, r: 20 },   //vege1 !!
        {"name": "", "value": 10, x: 170, y: 120, r: 25 },  //vege2 

        //toppings inside
        {"name": "", "value": 10, x: -195, y: -195, r: 100 },  //vegetop
        {"name": "", "value": 10, x: -220, y: -80, r: 80 },  //cheesetop
        
        {"name": "", "value": 10, x: -79, y: -150, r: 45 }, //meattop
        {"name": "", "value": 10, x: -140, y: -185, r: 20 },  //seafoodtop
        
        {"name": "", "value": 10, x: -380, y: -50, r: 25 }, //herb
        {"name": "", "value": 10, x: -375, y: 5, r: 25 },  //fruit
        {"name": "", "value": 10, x: -340, y: 60, r: 25 }, //nut
        {"name": "", "value": 10, x: -290, y: 100, r: 25 }, //sauce
        {"name": "", "value": 10, x: -128, y: 115, r: 35 }, //spicytop
        {"name": "", "value": 10, x: -200, y: 40, r: 34 },  //vegeteraiantop !!

        //base
        {"name": "", "value": 10, x: 125, y: -320, r: 55 }, //thinbase
        {"name": "", "value": 10, x: 189, y: -360, r: 18 }, //deepbase

        // spiciness-hot- spicytop
        {"name": "", "value": 10, x: -128, y: 115, r: 25 }, //spicytop!!

        //named pizza
        {"name": "", "value": 10, x: -180, y: -130, r: 45 },  //soho
        {"name": "", "value": 10, x: -170, y: -158, r: 45 }, //nap
        {"name": "", "value": 10, x: -130, y: -110, r: 38 },   //american
        {"name": "", "value": 10, x: -135, y: -150, r: 30 }, //fruitti
        {"name": "", "value": 10, x: -150, y: -124, r: 20 }, //marg
        
        {"name": "", "value": 10, x: 100, y: -100, r: 10 }, //americanhot
        {"name": "", "value": 10, x: 45, y: -230, r: 10 },  //cajun
        {"name": "", "value": 10, x: 100, y: -40, r: 10} , //capricciosa
        {"name": "", "value": 10, x: 70, y: -90, r: 10 }, //caprina
        {"name": "", "value": 10, x: 65, y: -120, r: 10 }, //fiorentina
        {"name": "", "value": 10, x: 90, y: -180, r: 10 },  //four
        {"name": "", "value": 10, x: 75, y: -55, r: 10 }, //giardiniera
        {"name": "", "value": 10, x: 55, y: -150, r: 10 },   //lareine
        {"name": "", "value": 10, x: 70, y: -240, r: 10 }, //mushroom
        {"name": "", "value": 10, x: 90, y: -140, r: 10 }, //parmense
        {"name": "", "value": 10, x: 30, y: -260, r: 10 }, //pollo
        {"name": "", "value": 10, x: 105, y:-70, r: 10 },  //prince
        {"name": "", "value": 10, x: 85, y:-210, r: 10 },  //quattro
        {"name": "", "value": 10, x: 75, y: -10, r: 10 },  //rosa
        {"name": "", "value": 10, x: 115, y:-120, r: 10 },  //siciliana
        {"name": "", "value": 10, x: 53, y: 14, r: 10 },  //sloppy
        {"name": "", "value": 10, x: 55, y: -190, r: 10 },  //veneziana

        //nonvegepizza inside
        {"name": "", "value": 10, x: -79, y: -150, r: 45 }, //meattop
        {"name": "", "value": 10, x: -140, y: -185, r: 20  },  //seafoodtop

        //vegetopping inside
        {"name": "", "value": 10, x: -200, y: -270, r: 15 }, //peppertop
        {"name": "", "value": 10, x: -140, y: -130, r: 6 },  //tomatotop !!
        {"name": "", "value": 10, x: -240, y:-240, r: 15 },  //oniontop
        
        {"name": "", "value": 10, x: -270, y:-190, r: 5 },  //artichoke
        {"name": "", "value": 10, x: -275, y:-210, r: 5 },  //asp
        {"name": "", "value": 10, x: -185, y:-190, r: 5 },  //caper !!
        {"name": "", "value": 10, x: -259, y: -135, r: 10 },  //cheesyvege !!
        {"name": "", "value": 10, x: -155, y: -150, r: 5 },  //garlic !!
        {"name": "", "value": 10, x: -265, y:-250, r: 5 },  //leek
        {"name": "", "value": 10, x: -275, y:-230, r: 5 },  //mushroom
        {"name": "", "value": 10, x: -190, y:-160, r: 5 },  //olive !!
        {"name": "", "value": 10, x: -245, y:-180, r: 5 },  //petitpois
        {"name": "", "value": 10, x: -205, y:-110, r: 8 },  //rocket !!
        {"name": "", "value": 10, x: -265, y:-170, r: 5 },  //spinach

        //cheese topping
        {"name": "", "value": 10, x: -259, y: -135, r: 10 },  //cheesyvege !!
        {"name": "", "value": 10, x: -265, y: -40, r: 10 },  //fourcheese
        {"name": "", "value": 10, x: -280, y: -60, r: 10 },  //goat
        {"name": "", "value": 10, x: -285, y: -85, r: 10 },  //gorg
        {"name": "", "value": 10, x: -160, y: -120, r: 6 },  //mozz !!
        {"name": "", "value": 10, x: -180, y: -99, r: 6 },  //parm !!
        {"name": "", "value": 10, x: -230, y: -20, r: 15 },  //cheesypizza !!

        //meattopping
        {"name": "", "value": 10, x: -65, y: -150, r: 10 },  //ham
        {"name": "", "value": 10, x: -60, y: -130, r: 6 },  //chicken
        {"name": "", "value": 10, x: -85, y:-150, r: 6 },  //hotspiced
        {"name": "", "value": 10, x: -105, y: -125, r: 6 },  //pep !!
        {"name": "", "value": 10, x: -70, y: -180, r: 10},  //meatyypizza !!

        //seafood topping
        {"name": "", "value": 10, x: -150, y: -187, r: 5 },  //anchovies
        {"name": "", "value": 10, x: -140, y:-170, r: 5 },  //mixed
        {"name": "", "value": 10, x: -130, y:-190, r: 5 },  //prawns
        
        {"name": "", "value": 10, x: -380, y: -38, r: 10 },  //cajunspicetop
        {"name": "", "value": 10, x: -380, y: -60, r: 10 }, //rosemarytop
        
        {"name": "", "value": 10, x: -375, y: 5, r: 10 }, //sultana
        
        {"name": "", "value": 10, x: -340, y: 60, r: 10 },  //pinekerel
        
        {"name": "", "value": 10, x: -290, y: 100, r: 10 }, //tobascopepper  
        
        {"name": "", "value": 10, x: -128, y: 115, r: 25 },  //spicypizza !!

        // vegeteriantop
        {"name": "", "value": 10, x: -190, y: 40, r: 20 }, //vege1 !!

        // thinncrispybase- pizza
        {"name": "", "value": 10, x: 115, y: -300, r: 25 },  // thinpizza !!

        //named pizza- soho
        {"name": "", "value": 10, x: -155, y: -150, r: 5 },  //garlictop !!
        {"name": "", "value": 10, x: -160, y: -120, r: 6  },  //mozzarellatop !!
        {"name": "", "value": 10, x: -190, y:-160, r: 5 },  //olivetop !!
        {"name": "", "value": 10, x: -180, y: -99, r: 6 },  //parmesantop
        {"name": "", "value": 10, x: -205, y:-110, r: 8 },  //rockettop
        {"name": "", "value": 10, x: -140, y: -130, r: 6  },  //tomatotop !!

        //named pizza- nap
        {"name": "", "value": 10, x: -150, y: -187, r: 5 },  //anchovietop
        {"name": "", "value": 10, x: -185, y:-190, r: 5  },  //caper
        {"name": "", "value": 10, x: -160, y: -120, r: 6  },  //mozarellatop !!
        {"name": "", "value": 10, x: -190, y:-160, r: 5 },  //olivetop !!
        {"name": "", "value": 10, x: -140, y: -130, r: 6 },  //tomatotop !!

        //named pizza- american
        {"name": "", "value": 10, x: -160, y: -120, r: 6  },  //moztop !!
        {"name": "", "value": 10, x: -105, y: -125, r: 6  },  //peptop 
        {"name": "", "value": 10, x: -140, y: -130, r: 6  },  //tomatotop !!

        //named pizza- fruitti
        {"name": "", "value": 10, x: -155, y: -150, r: 5 }, //garlictop !!
        {"name": "", "value": 10, x: -140, y:-170, r: 5 },  //mixedseafood 
        {"name": "", "value": 10, x: -140, y: -130, r: 6 },  //tomatotop !!

        //named pizza- margherita
        {"name": "", "value": 10, x: -160, y: -120, r: 6  },  //moztop !!
        {"name": "", "value": 10, x: -140, y: -130, r: 6  },  //tomatotop !!

        // peppertop
        {"name": "", "value": 10, x: -200, y: -280, r: 5 }, //greenpepper 
        {"name": "", "value": 10, x: -193, y:-270, r: 5},  //jalepeno
        {"name": "", "value": 10, x: -207, y:-270, r: 5 },  //peperonata
        {"name": "", "value": 10, x: -200, y:-260, r: 5 },  //sweet

        //tomatotop
        {"name": "", "value": 10, x: -140, y: -133, r: 2 }, //sliced
        {"name": "", "value": 10, x: -140, y: -127, r: 2},  //sundried

        //oniontop
        {"name": "", "value": 10, x: -240, y:-240, r: 5 },  //redonion

        //hamtop
        {"name": "", "value": 10, x: -65, y: -150, r: 5 },  //parmaham
        
        {"name": "", "value": 10, x: -200, y: -280, r: 2 }, //

    ];


    // Color scale (more flexible)
    const color = d3.scaleOrdinal()
    .range(["lightblue", "#00BFFF", "#1E90FF", "#0000FF"]); // Various blues


    const root = pack(data, preDefinedPositions);

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
        .attr("width", width+600)
        .attr("height", height)
        .attr("style", `max-width: 100%; height: auto; display: block; margin: 0 -14px; background: ${color(0)}; cursor: pointer;`);


    let currentFocus = root; // Track the current zoom focus (initially the root)

    // the circles (with color based on data)
    const node = svg.append("g")
        .attr('name', 'class-circle')
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .enter().append('g')
        .attr("name", function(d){return d.data.name})
        .append('circle')
        .attr("fill", d => {
        if (d.data.color) { // Check if a 'color' property exists in the data
            return d.data.color; // Use the data's color
        } else {
            return color(-3); // Default color for leaf nodes
        }
        })
        .attr("fill-opacity", 0.7) // Opacity of the fill
        
        .attr("pointer-events", d => !d.children ? "none" : null)
        
        .on("mouseover", function(event, d) { 
        if (d.children && d.depth === currentFocus.depth + 1) {
            d3.select(this).attr("stroke", "#000");
            d3.select(this).attr("stroke-width", 6);
        }
                                        
        this.parentNode.appendChild(this);
        })
        
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .on("click", (event, d) =>  {
        if (currentFocus !== d) {
        // Zoom into the clicked node only if it's part of the next layer
        if (d.depth === currentFocus.depth + 1) {
            currentFocus = d; // Update the current focus
            zoom(event, d); // Perform the zoom action
            event.stopPropagation();
        }
        }
    });

    // Append the text labels.
    const label = svg.append("g")
        .style("font", "60px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .style("font-weight", "bold")
        .text(d => d.data.name);

    // Create the zoom behavior and zoom immediately in to the initial focus node.
    svg.on("click", (event) => zoom(event, root));
    let focus = root;
    let view;
    zoomTo([focus.x, focus.y, focus.r * 2]);

    function zoomTo(v) {
        const k = width / v[2];
        view = v;
        
        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
        
    }

    function zoom(event, d) {
        const focus0 = focus;
        focus = d;

        if (d === root) {
        currentFocus = root;
        }
    
        const transition = svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
            }
                );

        label
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    return svg.node();
}