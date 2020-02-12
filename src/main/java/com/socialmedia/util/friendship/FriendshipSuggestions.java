package com.socialmedia.util.friendship;

import com.socialmedia.model.ApplicationUser;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class FriendshipSuggestions {
  private ApplicationUser currentUser;
  private UserGraph graph;

  public FriendshipSuggestions(ApplicationUser currentUser) {
    this.currentUser = currentUser;
    this.graph = new UserGraph();
  }

  public Map<ApplicationUser, List<ApplicationUser>> getFriendshipSuggestions() {
    currentUser.getFriends().forEach(friend -> {
      addVertexForGraph(friend);
      addVertexForGraph(friend.getFriends());
    });

    currentUser.getFriends().forEach(friend -> addEdgesForGraph(friend, friend.getFriends()));

    //Breadth-First Traversal
    return graph.breadthFirstTraversal(currentUser).entrySet().stream()
            .filter(item -> !item.getKey().equals(currentUser)
                    && !item.getValue().contains(currentUser)
                    && !checkFriendRequests(item.getKey()))
            .collect(Collectors.toMap(Map.Entry::getKey, entry -> getCommonFriends(currentUser, entry.getValue())));
  }

  private boolean checkFriendRequests(ApplicationUser user) {
    return user.getIncomingFriendRequests().stream().anyMatch(req -> req.getRequester().equals(currentUser))
            || currentUser.getIncomingFriendRequests().stream().anyMatch(req -> req.getRequester().equals(user));
  }

  private List<ApplicationUser> getCommonFriends(ApplicationUser user, List<ApplicationUser> friends) {
    return friends.stream()
            .filter(friend -> friend.getFriends().contains(user))
            .collect(Collectors.toList());
  }

  private void addVertexForGraph(ApplicationUser user) {
    graph.addVertex(user);
  }

  private void addVertexForGraph(List<ApplicationUser> friendsOfMyFriend) {
    friendsOfMyFriend.forEach(friend -> graph.addVertex(friend));
  }

  private void addEdgesForGraph(ApplicationUser friend, List<ApplicationUser> friendsOfMyFriend) {
    friendsOfMyFriend.forEach(friendOfMyFriend -> graph.addEdge(friend, friendOfMyFriend));
  }
}
