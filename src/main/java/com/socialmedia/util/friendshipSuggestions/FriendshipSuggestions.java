package com.socialmedia.util.friendshipSuggestions;

import com.socialmedia.model.ApplicationUser;

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



