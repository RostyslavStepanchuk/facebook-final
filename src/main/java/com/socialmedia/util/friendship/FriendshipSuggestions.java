package com.socialmedia.util.friendship;

import com.socialmedia.model.ApplicationUser;

import java.util.List;

public class FriendshipSuggestions {
  private ApplicationUser currentUser;
  private UserGraph graph = new UserGraph();

  public FriendshipSuggestions(ApplicationUser currentUser) {
    this.currentUser = currentUser;
  }

  public void getFriendshipSuggestions() {
    currentUser.getFriends().stream().forEach(friend -> {
      addVertexForGraph(friend);
      addVertexForGraph(friend.getFriends());
    });

    currentUser.getFriends().stream().forEach(friend -> addEdgesForGraph(friend, friend.getFriends()));

    //Breadth-First Traversal
    graph.breadthFirstTraversal(currentUser.getUsername());
    //Depth-First Traversal
    graph.depthFirstTraversal(currentUser.getUsername());
  }

  private void addVertexForGraph(ApplicationUser user) {
    graph.addVertex(user.getUsername());
  }

  private void addVertexForGraph(List<ApplicationUser> friendsOfMyFriend) {
    friendsOfMyFriend.stream().forEach(item -> graph.addVertex(item.getUsername()));
  }

  private void addEdgesForGraph(ApplicationUser friend, List<ApplicationUser> friendsOfMyFriend) {
    friendsOfMyFriend.stream().forEach(item -> graph.addEdge(friend.getUsername(), item.getUsername()));
  }
}
