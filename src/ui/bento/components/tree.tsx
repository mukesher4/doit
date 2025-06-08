"use client"

import React, { useState } from "react";
import { ReactElement } from 'react';

interface TreeNodeProps {
  node: TreeNode;
  onToggle: (id: number) => void;
}

class TreeNode {
  id: number;
  text: string;
  side: "left" | "right" | null;
  done: boolean;
  children: TreeNode[];
  parent: TreeNode | null;
  top?: number;

  constructor(id: number, text: string, side: "left" | "right" | null = null, done: boolean = false) {
    this.id = id;
    this.text = text;
    this.side = side;
    this.done = done;
    this.children = [];
    this.parent = null;
  }

  addChild(child: TreeNode): void {
    child.parent = this;
    this.children.push(child);
  }

  // Check if all children are done
  allChildrenDone(): boolean {
    return this.children.length === 0 || this.children.every(child => child.done);
  }

  // Update parent status based on children
  updateParentStatus(): void {
    if (this.parent && !this.done) {
      this.parent.done = false;
      this.parent.updateParentStatus();
    }
  }

  // Update children status when parent is marked done
  updateChildrenStatus(status: boolean): void {
    this.children.forEach(child => {
      child.done = status;
      child.updateChildrenStatus(status);
    });
  }
}

function TaskNode({ node, onToggle }: TreeNodeProps) {
  const isLeft = node.side === "left";

  return (
    <div
      className="absolute flex items-center"
      style={{
        top: node.top, 
        [isLeft ? "right" : "left"]: "50%",
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {!isLeft && (
            <div className="flex items-center">
              <div className="w-8 h-px bg-white/50" />
              <div 
                onClick={() => onToggle(node.id)}
                className={`w-3 h-3 border-white/50 border-2 shadow-inner cursor-pointer transition-colors duration-200 ${!node.done ? "bg-gray-400" : "bg-green-500"}`}
              />
            </div>
          )}
          <div className={`text-white text-[14px] ${isLeft ? "text-right" : "text-left"} relative`}>
            <span className={`${node.done ? "line-through" : ""}`}>{node.text}</span>
          </div>
          {isLeft && (
            <div className="flex items-center">
              <div 
                onClick={() => onToggle(node.id)}
                className={`w-3 h-3 border-white/50 border-2 shadow-inner cursor-pointer transition-colors duration-200 ${!node.done ? "bg-gray-400" : "bg-green-500"}`}
              />
              <div className="w-8 h-px bg-white/50" />
            </div>
          )}
        </div>

        <div className="text-white">
          {node.children.length > 0 && (
            <div className="space-y-2">
              {node.children.map((child: TreeNode) => (
                <div key={child.id} className={`flex ${!isLeft ? '' : 'justify-end'} items-center gap-2`}>
                  {!isLeft && (
                    <div className="flex items-center">
                      <div className="w-16 h-px bg-white/50" />
                      <div 
                        onClick={() => onToggle(child.id)}
                        className={`w-3 h-3 border-white/50 border-2 shadow-inner cursor-pointer transition-colors duration-200 ${!child.done ? "bg-gray-400" : "bg-green-500"}`}
                      />
                    </div>
                  )}
                  <div className={`text-white text-sm ${isLeft ? "text-right" : "text-left"} relative`}>
                    <span className={`${child.done ? "line-through" : ""}`}>{child.text}</span>
                  </div>
                  {isLeft && (
                    <div className="flex items-center">
                      <div 
                        onClick={() => onToggle(child.id)}
                        className={`w-3 h-3 border-white/50 border-2 shadow-inner cursor-pointer transition-colors duration-200 ${!child.done ? "bg-gray-400" : "bg-green-500"}`}
                      />
                      <div className="w-16 h-px bg-white/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Tree(): ReactElement {
  // Initialize tree structure
  const initializeTree = (): TreeNode[] => {
    // Create parent nodes
    const task1 = new TreeNode(1, "Finish DP From Striver's DSA Sheet", "right", false);
    const task4 = new TreeNode(4, "Finish off Figma Design for Persn. Proj", "left", true);

    // Create and add children
    const child2 = new TreeNode(2, "Design Buttons", null, false);
    const child3 = new TreeNode(3, "Choose Color Scheme", null, false);
    const child5 = new TreeNode(5, "Finish in Python", null, true);
    const child6 = new TreeNode(6, "Finish in C++", null, true);

    task1.addChild(child2);
    task1.addChild(child3);
    task4.addChild(child5);
    task4.addChild(child6);

    return [task1, task4];
  };

  const [taskTree, setTaskTree] = useState<TreeNode[]>(initializeTree());

  // Find node by ID in the tree
  const findNodeById = (nodes: TreeNode[], id: number): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
    return null;
  };

  const handleToggle = (id: number): void => {
    setTaskTree((prevTree: TreeNode[]) => {
      // Create deep copy of the tree
      const newTree = prevTree.map((node: TreeNode) => cloneNode(node));
      
      // Find the node to toggle
      const nodeToToggle = findNodeById(newTree, id);
      
      if (nodeToToggle) {
        // Toggle the node
        nodeToToggle.done = !nodeToToggle.done;
        
        if (nodeToToggle.done) {
          // If marking as done, mark all children as done
          nodeToToggle.updateChildrenStatus(true);
        } else {
          // If marking as not done, update parent status
          nodeToToggle.updateParentStatus();
        }
        
        // Update parent status based on all children completion
        if (nodeToToggle.parent) {
          nodeToToggle.parent.done = nodeToToggle.parent.allChildrenDone();
        }
      }
      
      return newTree;
    });
  };

  // Deep clone function for tree nodes
  const cloneNode = (node: TreeNode): TreeNode => {
    const cloned = new TreeNode(node.id, node.text, node.side, node.done);
    cloned.children = node.children.map((child: TreeNode) => {
      const clonedChild = cloneNode(child);
      clonedChild.parent = cloned;
      return clonedChild;
    });
    return cloned;
  };

  // Calculate dynamic top positions
  const PARENT_HEIGHT: number = 32;
  const CHILD_HEIGHT: number = 28;
  const BLOCK_GAP: number = 20;

  let currentTop: number = 50;
  const tasksWithPosition: TreeNode[] = taskTree.map((task: TreeNode) => {
    task.top = currentTop;
    const blockHeight: number = PARENT_HEIGHT + 
                               task.children.length * CHILD_HEIGHT + 
                               BLOCK_GAP;
    currentTop += blockHeight;
    return task;
  });

  return (
    <div className="relative w-full h-[300px]"> 
      <div className="absolute left-1/2 top-0 w-px h-full bg-white/50" />
      <div className="w-[5px] h-[30px] absolute bg-white transform -translate-x-1/2 left-1/2"></div>
      <div className="absolute left-1/2 ml-3 text-white text-xl">Tasks</div>
      {tasksWithPosition.map((task: TreeNode) =>
        <TaskNode key={task.id} node={task} onToggle={handleToggle} />
      )}
    </div>
  );
}