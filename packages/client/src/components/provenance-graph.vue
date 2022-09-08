<template>
  <div ref="root"/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

function Tree(data: any, {
  //lGiven a node d, returns the display name
  label = (d: any) => d.name,

  // Outer width, in pixels
  width = 640,

  // Outer height, in pixels
  height = 500,

  // Radius of nodes
  r = 4,

  // Horizontal padding for first and last column
  padding = 1,

  // Fill for nodes
  fill = "#999",

  // Stroke for links
  stroke = "#555",

  // Stroke width for links
  strokeWidth = 3.5,

  // Stroke opacity for links
  strokeOpacity = 0.4,

  // Color of label halo
  halo = "#fff",

  // Padding around the labels
  haloWidth = 3,
} = {}) {
  const root = d3.hierarchy(data); // default 'd.children'

  // Compute labels and titles.
  const descendants = root.descendants();
  const L = descendants.map((d: any) => label(d.data, d));

  // Compute the layout.
  const dx = 30;
  const dy = width / (root.height + padding);
  d3.tree().nodeSize([dx, dy])(root);

  // Center the tree.
  let x0 = Infinity;
  let x1 = -x0;
  root.each((d: any) => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  // Compute the default height.
  if (height === undefined) height = x1 - x0 + dx * 2;

  const svg = d3.create("svg")
      .attr("viewBox", [-dy * padding / 2, x0 - dx, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", stroke)
      .attr("stroke-opacity", strokeOpacity)
      .attr("stroke-width", strokeWidth)
    .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", d3.linkHorizontal().x((d: any) => d.y).y((d: any) => d.x) as any);

  const node = svg.append("g")
    .selectAll("g")
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('transform', d => `translate(${d.y},${d.x})`);

  node.filter(d => d.data.type !== "simulation")
      .append("circle")
      .attr("fill", d => d.children ? stroke : fill)
      .attr("r", r);

  node.filter(d => d.data.type === "simulation")
      .append("rect")
      .attr("x", -4)
      .attr("y", -4)
      .attr("width", 8)
      .attr("height", 8)
      .attr("fill", "f80");

  if (L) {
    node.append("text")
      .attr("dy", "0.32em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .attr("paint-order", "stroke")
      .attr("stroke", halo)
      .attr("stroke-width", haloWidth)
      .text((_d, i) => L[i]);
  }

  return svg.node();
}

const root = ref(null);

const data2 = Object({
  name: 'gromet',
  children: [
    {
      name: 'add annotation',
      children: [
        {
          name: 'add another annotation 22222'
        }
      ]
    },
    {
      name: 'test'
    }
  ]
});

const blah = Tree(data2, {
  width: 600,
  height: 400
});

console.log(blah);

onMounted(() => {
  console.log('Mounted provenance graph', root);
  const svg = d3.select(root.value).append('svg')
    .style('width', '200px')
    .style('height', '200px');

  svg.append('circle')
    .attr('cx', 30)
    .attr('cy', 30)
    .attr('r', 10)
    .attr('fill', 'red');

  root.value.appendChild(blah);
});

</script>
