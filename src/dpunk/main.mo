import Word32 "mo:base/Word32";
import Nat32 "mo:base/Nat32";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Option "mo:base/Option";

import Types "./types";

actor DPunk {

    type Punk = Types.Punk;

    func isEq(x: Nat, y: Nat): Bool { x == y };

    func hashNat(x: Nat): Hash.Hash { Word32.fromNat(x) };

    let punks = HashMap.HashMap<Nat, Punk>(10000, isEq, hashNat);

    public query func getPunks() : async [Punk] {
        var items: [Punk] = [];
        
        for ((id, punk) in punks.entries()) {
            items := Array.append<Punk>(items, [punk]);
        };

        items
    };

    public query func userPunks(user: Word32): async [Punk] {
        var items: [Punk] = [];
        
        for ((id, punk) in punks.entries()) {
            if (punk.owner == user) {
                items := Array.append<Punk>(items, [punk]);
            }
        };

        items
    };

    public func claimPunk(punkId: Nat, user: Word32) {
        if (punkId > 10000) return;
        if (punkId < 0) return;

        let item: Punk = {
            address = punkId;
            owner = user;
        };

        var punk = punks.get(punkId);
        if (punk == null) {
            punks.put(punkId, item);
        }
    };

    public func sellPunk(punkId: Nat, userFrom: Word32, userTo: Word32) {
        if (punkId > 10000) return;
        if (punkId < 0) return;

        var punk = punks.get(punkId);
        if (punk == null) return;
        
        let currentOwner = Option.unwrap(punk).owner;
        if (currentOwner != userFrom) return;
        
        let item: Punk = {
            address = punkId;
            owner = userTo;
        };
        punks.put(punkId, item);
    }
};
