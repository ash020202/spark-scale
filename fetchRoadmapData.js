// fetchRoadmapData.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dagre from "dagre";
const api = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(api); // Replace with your API key
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 50;

const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({ rankdir: "TB", nodesep: 80, ranksep: 100 });

  nodes.forEach((node) =>
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  );
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const { x, y } = dagreGraph.node(node.id);
    node.position = { x, y };
    node.targetPosition = "top";
    node.sourcePosition = "bottom";
  });

  return { nodes, edges };
};
export const fetchRoadmapData = async (title, description) => {
  try {
    const prompt = `Generate a roadmap in JSON format with the following structure:
{
  nodes: [
    { id: "1", label: "Start", description: "Begin project", link: "https://example.com" },
    { id: "2", label: "Step 2", description: "Continue project", link: "https://example.com" }
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" }
  ]
}
Based on the business: "${title}" with description: "${description}"`;

    const promptForAnalysis = `Generate a business analysis JSON with the following structure:
        {
          "successRate": 75,
          "uniquenessScore": 82,
          "competitors": [
            { "name": "Nike Training Club", "strength": "Medium" },
            { "name": "Strava", "strength": "Medium" },
            { "name": "Peloton", "strength": "Medium" },
            { "name": "Noom", "strength": "Low" },
            { "name": "Freeletics", "strength": "Low" }
          ],
          "uniqueFeatures": [
            "AI-driven personalized workout plans based on user feedback",
            "Virtual reality guided exercises for immersive home workout",
            "Social fitness challenge platform connecting users with similar goals"
          ],
          "strategies": [
            "Focus on user retention through personalized content and community features",
            "Partner with influencers and athletes for marketing",
            "Implement freemium model with premium AI and VR features"
          ]
        }
        Based on the business idea titled: "${title}" with description: "${description}"`;
    const result = await model.generateContent(prompt);
    const competeAnalysis = await model.generateContent(promptForAnalysis);

    // Access the response text
    let responseText = result.response.text();
    let analysis = competeAnalysis.response.text();
    // Clean the response text
    responseText = responseText.replace(/```json|```/g, "").trim();

    analysis = analysis.replace(/```json|```/g, "").trim();
    // Parse the cleaned JSON
    const roadmapData = JSON.parse(responseText);
    // Log the parsed data
    const analysisData = JSON.parse(analysis);
    window.localStorage.setItem("analysis", JSON.stringify(analysisData));
    const descriptions = roadmapData.nodes.map((node) => node.description);
    const links = roadmapData.nodes.map((node) => node.link);
    // Ensure we return nodes and edges

    const formattedNodes = roadmapData.nodes.map((node) => ({
      id: node.id,
      data: { label: node.label || "No Label" }, // Ensure label exists
      position: { x: 0, y: 0 }, // Will be updated by Dagre layout
    }));
    // const formattedEdges = [...newEdges];
    const formattedEdges = roadmapData.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    }));

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      formattedNodes,
      formattedEdges
    );

    return {
      nodes: layoutedNodes,
      edges: layoutedEdges,
      analysis: analysisData,
      descriptions: descriptions,
      links: links,
    };
  } catch (error) {
    console.error("Error fetching roadmap data:", error);

    if (error.code === 429) {
      console.log("Too many requests. Please wait and try again later.");
    } else {
      return {
        nodes: [],
        edges: [],
        error: "Failed to fetch roadmap data. Please try again later.",
      };
    }
    // Return empty arrays if an error occurs
  }
};
