function nodeLink(data) {
    // Specify the dimensions of the chart.
    // const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 1800;
    const height = 700;
  
      const color = d3.scaleLinear()
        .domain([0, 5])
              .range(["hsl(0, 0%, 100%)", "hsl(0,0%, 50%)"])
              .interpolate(d3.interpolateHcl);
  
    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map(d => ({...d}));
    const nodes = data.nodes.map(d => ({...d}));
  
    // Create a simulation with several forces.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(350))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);
  
    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width-10)
        .attr("height", height-10)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;")
        .style("overflow", "hidden");
  
        // Define the zoom behavior
      const zoom = d3.zoom()
        .scaleExtent([0.5, 3])  // Set zoom limits (min, max)
        .on("zoom", zoomed);
      
      // Apply zoom behavior to the SVG
      svg.call(zoom);
      
      // Create a group to hold all chart elements
      const chartGroup = svg.append("g");
  
    // Define the arrow marker for the links.
    const arrow = svg.append("defs").append("marker")
      .attr("id", "arrowhead")          // Give the marker an ID
      .attr("viewBox", "0 -5 10 10")    // Viewbox for the arrowhead (adjusts positioning)
      .attr("refX", 70)                 // The distance from the line to the arrowhead
      .attr("refY", 0)
      .attr("orient", "auto")           // Auto-rotation based on the line's direction
      .attr("markerWidth", 6)           // Size of the marker
      .attr("markerHeight", 6)
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")      // Draws the arrow shape (triangle)
      .attr("fill", "#999");            // Color of the arrow
  
    // Add a line for each link, and a circle for each node.
    const link = chartGroup.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 1)
      .selectAll()
      .data(links)
      .join("line")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead");
  
    // Add text labels to the links (edges)
    const linkLabels = chartGroup.append("g")
      .selectAll()
      .data(links)
      .join("text")
        .attr("class", "linkLabel")
        .attr("x", d => (d.source.x + d.target.x) / 2)  
        .attr("y", d => (d.source.y + d.target.y) / 2) 
        .attr("dy", "-0.2em") 
        .attr("font-size", "10px") 
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text(d => d.value);
  
    const node = chartGroup.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("ellipse")
        .attr("rx", 60)
        .attr("ry", 20)
        .attr("fill", d => color(d.group));
  
    node.append("title")
        .text(d => d.id);
  
    // Add a drag behavior.
    node.call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  
      // Add text labels for the nodes
    const nodeLabels = chartGroup.append("g")
      .selectAll()
      .data(nodes)
      .join("text")
        .attr("class", "nodeLabel")
        .attr("x", d => d.x) 
        .attr("y", d => d.y)  // Position text above the node
        .attr("dy", ".35em")      // Center the text vertically
        .attr("text-anchor", "middle")  
        .attr("font-size", "9px")  
        .attr("fill", "black")
        .text(d => d.id); 
  
    // Set the position attributes of links and nodes each time the simulation ticks.
    function ticked() {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
  
      linkLabels
          .attr("x", d => (d.source.x + d.target.x) / 2)
          .attr("y", d => (d.source.y + d.target.y) / 2);
  
       nodeLabels
          .attr("x", d => d.x)  // Keep text slightly to the right of nodes
          .attr("y", d => d.y);  
    }
  
    // Zoomed function (called when zooming or panning)
    function zoomed(event) {
      chartGroup.attr("transform", event.transform); // Apply transformation (scaling and translation)
    }
    
    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
  
    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
  
    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  
    function highlightNode(d) {
      // Highlight the clicked node by changing its fill color and the neighboring nodes connected to the clicked node
      node.attr("fill", node => {
        const neighbor = links.some(link => (link.source === node && link.target === d) || (link.target === node && link.source === d))
        return node === d ? "red" : neighbor ? "orange" : color(node.group);
      });
      
      nodeLabels.attr("fill", node => node === d ? "#fff" : color(nodeLabels.group));
  
      linkLabels.attr("fill", l => (l.source === d || l.target === d) ? "orange" : color(node.group));
      
      // Highlight the edges connected to the clicked node
      link.attr("stroke", l => (l.source === d || l.target === d) ? "orange" : "#999")  // Change color of connected edges
        .attr("stroke-width", l => (l.source === d || l.target === d) ? 30 : Math.sqrt(l.value))  // Increase width of connected edges
        .join("line")
        .attr("stroke-width", 2)    
        .attr("marker-end", function (l) {
          // Dynamically set a unique marker for each link
          const markerColor = (l.source === d || l.target === d) ? "orange" : "#999";
          const markerId = "arrowhead-" + (l.source.id + "-" + l.target.id);
          
          // Create a new marker for each link if it doesn't exist
          const existingMarker = svg.select(`#${markerId}`);
          if (existingMarker.empty()) {
            const newMarker = svg.append("defs").append("marker")
              .attr("id", markerId)
              .attr("viewBox", "0 -5 10 10")
              .attr("refX", 70)
              .attr("refY", 0)
              .attr("orient", "auto")
              .attr("markerWidth", 6)
              .attr("markerHeight", 6)
              .append("path")
              .attr("d", "M0,-5L10,0L0,5")
              .attr("fill", markerColor); // Set the color for this link's arrowhead
    
            return `url(#${markerId})`;
          } else {
            return `url(#${markerId})`; // Return the existing marker ID
          }
      });
  
      // Handle link label colors (edges connected to the clicked node)
      linkLabels.attr("fill", l => (l.source === d || l.target === d) ? "orange" : color(node.group));
    }
  
    function resetHighlight() {
      node.attr("fill", d => color(d.group));  // Reset node color
      nodeLabels.attr("fill", "black")
    
      linkLabels.attr("fill", "black"); 
      
      // Reset all dynamic markers by removing them
      svg.selectAll("defs marker").remove(); 
        
      link.attr("stroke", "#999")  // Reset edge color
        .join("line")
          .attr("stroke-width", 2)  // Reset edge width
          .attr("marker-end", "url(#arrowhead");
  
      const arrow = svg.append("defs").append("marker")
      .attr("id", "arrowhead")          // Give the marker an ID
      .attr("viewBox", "0 -5 10 10")    // Viewbox for the arrowhead (adjusts positioning)
      .attr("refX", 70)                 // The distance from the line to the arrowhead
      .attr("refY", 0)
      .attr("orient", "auto")           // Auto-rotation based on the line's direction
      .attr("markerWidth", 6)           // Size of the marker
      .attr("markerHeight", 6)
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")      // Draws the arrow shape (triangle)
      .attr("fill", "#999");    
    }
  
    node.on("click", function(event, d) {
      // Prevent highlighting if the same node is clicked again
      if (d3.select(this).classed("highlighted")) {
        resetHighlight();
        d3.select(this).classed("highlighted", false);  // Remove highlight class
      } else {
        highlightNode(d);
        d3.select(this).classed("highlighted", true);  // Add highlight class to the node
      }
    });
  
    node.on("mouseover", function(event, d) {
      // Change cursor to pointer on hover
      d3.select(this).style("cursor", "pointer");
    })
    .on("mouseout", function(event, d) {
      // Reset cursor when mouse leaves the node
      d3.select(this).style("cursor", "default");
    });
      
      // When this cell is re-run, stop the previous simulation. (This doesn’t
      // really matter since the target alpha is zero and the simulation will
      // stop naturally, but it’s a good practice.)
      simulation.stop();
      return svg.node();
}