import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
    ItemBought as ItemBoughtEvent,
    ItemCancelled as ItemCancelledEvent,
    NftListed as ItemListedEvent,
} from "../generated/Contract/Contract"
import { NftListed, ActiveItem, ItemBought, ItemCancelled } from "../generated/schema"

export function handleNftListed(event: ItemListedEvent): void {
    let nftListed = NftListed.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    let activeItem = ActiveItem.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    if (!nftListed) {
      nftListed = new NftListed(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        )
    }
    if (!activeItem) {
        activeItem = new ActiveItem(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        )
    }
    nftListed.seller = event.params.seller
    activeItem.seller = event.params.seller

    nftListed.nftAddress = event.params.nftAddress
    activeItem.nftAddress = event.params.nftAddress

    nftListed.tokenId = event.params.tokenId
    activeItem.tokenId = event.params.tokenId

    nftListed.price = event.params.price
    activeItem.price = event.params.price

    activeItem.buyer = Address.fromString("0x0000000000000000000000000000000000000000")

    nftListed.save()
    activeItem.save()
}

export function handleItemCancelled(event: ItemCancelledEvent): void {
    let itemCancelled = ItemCancelled.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    let activeItem = ActiveItem.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    if (!itemCancelled) {
        itemCancelled = new ItemCancelled(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        )
    }
    itemCancelled.seller = event.params.seller
    itemCancelled.nftAddress = event.params.nftAddress
    itemCancelled.tokenId = event.params.tokenId
    activeItem!.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD")

    itemCancelled.save()
    activeItem!.save()
}

export function handleItemBought(event: ItemBoughtEvent): void {
    let itemBought = ItemBought.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    let activeItem = ActiveItem.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
    if (!itemBought) {
        itemBought = new ItemBought(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        )
    }
    itemBought.buyer = event.params.buyer
    itemBought.nftAddress = event.params.nftAddress
    itemBought.tokenId = event.params.tokenId
    activeItem!.buyer = event.params.buyer

    itemBought.save()
    activeItem!.save()
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
    return tokenId.toHexString() + nftAddress.toHexString()
}