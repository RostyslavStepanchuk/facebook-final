package com.socialmedia.util.friendship;

import com.socialmedia.model.ApplicationUser;

import java.util.List;
import java.util.Set;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Map;
import java.util.HashSet;
import java.util.stream.Collectors;

class UserGraph {
  private Map<GraphVertex, Set<GraphVertex>> adjVertices = new HashMap<>();

  void addVertex(ApplicationUser user) {
    adjVertices.putIfAbsent(new GraphVertex(user), new HashSet<>());
  }

  void removeVertex(ApplicationUser user) {
    GraphVertex vertex = new GraphVertex(user);
    adjVertices.values().forEach(item -> item.remove(vertex));
    adjVertices.remove(new GraphVertex(user));
  }

  void addEdge(ApplicationUser firstUser, ApplicationUser secondUser) {
    GraphVertex firstVertex = new GraphVertex(firstUser);
    GraphVertex secondVertex = new GraphVertex(secondUser);
    adjVertices.get(firstVertex).add(secondVertex);
    adjVertices.get(secondVertex).add(firstVertex);
  }

  void removeEdge(ApplicationUser firstUser, ApplicationUser secondUser) {
    GraphVertex firstVertex = new GraphVertex(firstUser);
    GraphVertex secondVertex = new GraphVertex(secondUser);
    Set<GraphVertex> verticesForFirst = adjVertices.get(firstVertex);
    Set<GraphVertex> verticesForSecond = adjVertices.get(secondVertex);
    if (verticesForFirst != null) {
      verticesForFirst.remove(secondVertex);
    }
    if (verticesForSecond != null) {
      verticesForSecond.remove(firstVertex);
    }
  }

  private Set<GraphVertex> getAdjVertices(ApplicationUser user) {
    return adjVertices.get(new GraphVertex(user));
  }

  Map<ApplicationUser, List<ApplicationUser>> breadthFirstTraversal(ApplicationUser currentUser) {
    Set<ApplicationUser> visited = new LinkedHashSet<>();
    Queue<ApplicationUser> queue = new LinkedList<>();
    queue.add(currentUser);
    visited.add(currentUser);
    while (!queue.isEmpty()) {
      ApplicationUser user = queue.poll();
      for (GraphVertex v : getAdjVertices(user)) {
        if (!visited.contains(v.user)) {
          visited.add(v.user);
          queue.add(v.user);
        }
      }
    }

    return visited.stream()
            .collect(Collectors.toMap(user -> user, user -> getAdjVertices(user)
                    .stream().map(vertex -> vertex.user).collect(Collectors.toList())));
  }
}
