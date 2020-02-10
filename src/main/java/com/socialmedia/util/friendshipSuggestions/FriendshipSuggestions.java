package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;

import java.util.*;

class Vertex {
  ApplicationUser user;

  Vertex(ApplicationUser user) {
    this.user = user;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Vertex vertex = (Vertex) o;
    return Objects.equals(user, vertex.user);
  }

  @Override
  public int hashCode() {
    return Objects.hash(user);
  }
}

class Graph {
  private Map<Vertex, List<Vertex>> adjVertices = new HashMap<>();

  void addVertex(ApplicationUser user) {
    adjVertices.putIfAbsent(new Vertex(user), new ArrayList<>());
  }

  void removeVertex(ApplicationUser user) {
    Vertex vertex = new Vertex(user);
    adjVertices.values().stream().forEach(item -> item.remove(vertex));
    adjVertices.remove(new Vertex(user));
  }

  void addEdge(ApplicationUser firstUser, ApplicationUser secondUser) {
    Vertex firstVertex = new Vertex(firstUser);
    Vertex secondVertex = new Vertex(secondUser);
    adjVertices.get(firstVertex).add(secondVertex);
    adjVertices.get(secondVertex).add(firstVertex);
  }

  void removeEdge(ApplicationUser firstUser, ApplicationUser secondUser) {
    Vertex firstVertex = new Vertex(firstUser);
    Vertex secondVertex = new Vertex(secondUser);
    List<Vertex> eV1 = adjVertices.get(firstVertex);
    List<Vertex> eV2 = adjVertices.get(secondVertex);
    if (eV1 != null) eV1.remove(secondVertex);
    if (eV2 != null) eV2.remove(firstVertex);
  }

  List<Vertex> getAdjVertices(ApplicationUser user) {
    return adjVertices.get(new Vertex(user));
  }

  Set<ApplicationUser> depthFirstTraversal(Graph graph, ApplicationUser user) {
    Set<ApplicationUser> visited = new LinkedHashSet<>();
    Stack<ApplicationUser> stack = new Stack<>();
    stack.push(user);
    while (!stack.isEmpty()) {
      ApplicationUser vertex = stack.pop();
      if (!visited.contains(vertex)) {
        visited.add(vertex);
        for (Vertex v : graph.getAdjVertices(vertex)) {
          stack.push(v.user);
        }
      }
    }
    return visited;
  }

  Set<ApplicationUser> breadthFirstTraversal(Graph graph, ApplicationUser user) {
    Set<ApplicationUser> visited = new LinkedHashSet<>();
    Queue<ApplicationUser> queue = new LinkedList<>();
    queue.add(user);
    visited.add(user);
    while (!queue.isEmpty()) {
      ApplicationUser vertex = queue.poll();
      for (Vertex v : graph.getAdjVertices(vertex)) {
        if (!visited.contains(v.user)) {
          visited.add(v.user);
          queue.add(v.user);
        }
      }
    }
    return visited;
  }
}

public class FriendshipSuggestions {
    private ApplicationUser user;

    public FriendshipSuggestions(ApplicationUser user) {
        this.user = user;
    }


    //    public static void main(String[] args) {
//        Graph graph = new Graph();
//        graph.addVertex("Bob");
//        graph.addVertex("Alice");
//        graph.addVertex("Mark");
//        graph.addVertex("Rob");
//        graph.addVertex("Maria");
//        graph.addEdge("Bob", "Alice");
//        graph.addEdge("Bob", "Rob");
//        graph.addEdge("Alice", "Mark");
//        graph.addEdge("Rob", "Mark");
//        graph.addEdge("Alice", "Maria");
//        graph.addEdge("Rob", "Maria");
//
//        System.out.println(graph.breadthFirstTraversal(graph, "Maria").toString());
//        System.out.println(graph.depthFirstTraversal(graph, "Maria").toString());
//    }
}



