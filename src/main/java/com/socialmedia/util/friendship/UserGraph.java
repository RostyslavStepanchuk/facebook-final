package com.socialmedia.util.friendship;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.Stack;
import java.util.Queue;
import java.util.LinkedList;

class UserGraph {
  private Map<String, Set<String>> adjVertices = new HashMap<>();

  public void addVertex(String username) {
    adjVertices.putIfAbsent(username, new HashSet<>());
  }

  void removeVertex(String username) {
    adjVertices.values().stream().forEach(item -> item.remove(username));
    adjVertices.remove(username);
  }

  void addEdge(String firstUsername, String secondUsername) {
    adjVertices.get(firstUsername).add(secondUsername);
    adjVertices.get(secondUsername).add(firstUsername);
  }

  void removeEdge(String firstUsername, String secondUsername) {
    Set<String> firstVertex = adjVertices.get(firstUsername);
    Set<String> secondVertex = adjVertices.get(secondUsername);
    if (firstVertex != null) {
      firstVertex.remove(secondUsername);
    }
    if (secondVertex != null) {
      secondVertex.remove(firstUsername);
    }
  }

  private Set<String> getAdjVertices(String username) {
    return adjVertices.get(username);
  }

  Set<String> depthFirstTraversal(String username) {
    Set<String> visited = new LinkedHashSet<>();
    Stack<String> stack = new Stack<>();
    stack.push(username);
    while (!stack.isEmpty()) {
      String vertex = stack.pop();
      if (!visited.contains(vertex)) {
        visited.add(vertex);
        for (String v : getAdjVertices(vertex)) {
          stack.push(v);
        }
      }
    }
    return visited;
  }

  Set<String> breadthFirstTraversal(String username) {
    Set<String> visited = new LinkedHashSet<>();
    Queue<String> queue = new LinkedList<>();
    queue.add(username);
    visited.add(username);
    while (!queue.isEmpty()) {
      String vertex = queue.poll();
      for (String v : getAdjVertices(vertex)) {
        if (!visited.contains(v)) {
          visited.add(v);
          queue.add(v);
        }
      }
    }
    return visited;
  }
}
