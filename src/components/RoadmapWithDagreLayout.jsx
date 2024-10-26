// components/RoadmapWithDagreLayout.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { fetchRoadmapData } from "../../fetchRoadmapData";
import CompetitorAnalysis from "./CompetitorAnalysis";
import SideBar from "./SideBar";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";

const RoadmapWithDagreLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { title, description } = location.state || {}; // Get title and description from route state
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null); // Store the clicked node's data
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchRoadmapData(title, description);
        const {
          nodes: newNodes,
          edges: newEdges,
          descriptions,
          links,
        } = response;
        if (response.error) {
          setError(response.error); // Set error if fetching fails
        }

        newNodes.forEach((node) => {
          node.style = { background: "#ffeb3b", borderRadius: "8px" };
        });

        newEdges.forEach((edge) => {
          edge.animated = true; // Enable animation
          edge.style = {
            stroke: "#2196f3",
            strokeWidth: 2,
            strokeDasharray: "5 5",
          };
        });

        // Save data to localStorage
        localStorage.setItem("nodes", JSON.stringify(newNodes));
        localStorage.setItem("edges", JSON.stringify(newEdges));
        localStorage.setItem("descriptions", JSON.stringify(descriptions));
        localStorage.setItem("links", JSON.stringify(links));

        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error("Error fetching roadmap data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Load data from localStorage or fetch if not available
    const storedNodes = JSON.parse(localStorage.getItem("nodes") || "[]");
    const storedEdges = JSON.parse(localStorage.getItem("edges") || "[]");

    if (storedNodes.length && storedEdges.length) {
      setNodes(storedNodes);
      setEdges(storedEdges);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [title, description]);

  const onNodesChange = (changes) =>
    setNodes((nds) => applyNodeChanges(changes, nds));

  const onEdgesChange = (changes) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  const onNodeClick = (event, node) => {
    const nodeId = node.id - 1;

    // Load descriptions and links from localStorage
    const descriptions = JSON.parse(
      localStorage.getItem("descriptions") || "{}"
    );
    const links = JSON.parse(localStorage.getItem("links") || "{}");

    const nodeDescription = descriptions[nodeId] || "Description not available";
    const nodeLinks = links[nodeId] || [];

    // Store the selected node's data and open the sidebar
    setSelectedNode({
      title: node.data.label || "No Title",
      description: nodeDescription,
      links: nodeLinks,
    });

    setIsSidebarOpen(true); // Open the sidebar
  };

  const goBack = () => {
    navigate("/");
    localStorage.clear(); // Clear localStorage on navigating back
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    // Render the error component when there's an error
    return <ErrorComponent message={error} onRetry={() => goBack()} />;
  }

  return (
    <div style={{ height: "100vh" }} className="relative">
      <header className="p-4 z-10 flex items-center justify-between">
        <button
          className=" rounded p-1 bg-black md:p-2 text-white z-20"
          onClick={goBack}
        >
          Go Back
        </button>
        <h1 className="text-2xl md:text-4xl ml-10 text-center ">
          Business Roadmap
        </h1>
        <button
          className=" rounded bg-black md:p-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          competitor analysis
        </button>
      </header>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
        <Background variant="lines" />
      </ReactFlow>

      <SideBar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        nodeData={selectedNode || { title: "", description: "", links: [] }}
      />

      <CompetitorAnalysis setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default RoadmapWithDagreLayout;
