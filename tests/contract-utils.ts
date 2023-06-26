import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ItemBought,
  ItemCancelled,
  NftListed
} from "../generated/Contract/Contract"

export function createItemBoughtEvent(
  buyer: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): ItemBought {
  let itemBoughtEvent = changetype<ItemBought>(newMockEvent())

  itemBoughtEvent.parameters = new Array()

  itemBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  itemBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemBoughtEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return itemBoughtEvent
}

export function createItemCancelledEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt
): ItemCancelled {
  let itemCancelledEvent = changetype<ItemCancelled>(newMockEvent())

  itemCancelledEvent.parameters = new Array()

  itemCancelledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return itemCancelledEvent
}

export function createNftListedEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): NftListed {
  let nftListedEvent = changetype<NftListed>(newMockEvent())

  nftListedEvent.parameters = new Array()

  nftListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftListedEvent
}
