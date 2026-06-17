export class GameService {
  private activeGames: Map<number, any> = new Map()

  async startGame(roomId: number, players: any[]) {
    const game = {
      id: Math.random(),
      roomId,
      players,
      status: 'playing',
      currentPlayerIndex: 0,
      deck: this.generateDeck(),
      playerHands: players.reduce((acc, player) => {
        acc[player.id] = this.drawCards(5)
        return acc
      }, {}),
      discardPile: [],
      startedAt: new Date(),
    }

    this.activeGames.set(roomId, game)
    return game
  }

  async makeMove(roomId: number, playerId: number, cardIndex: number) {
    const game = this.activeGames.get(roomId)
    if (!game) return null

    const playerHand = game.playerHands[playerId]
    if (!playerHand || !playerHand[cardIndex]) return null

    const card = playerHand[cardIndex]
    game.discardPile.push(card)
    playerHand.splice(cardIndex, 1)

    if (playerHand.length === 0) {
      return { winner: playerId, game }
    }

    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length

    return { success: true, game }
  }

  async finishGame(roomId: number, winnerId: number) {
    const game = this.activeGames.get(roomId)
    if (!game) return null

    game.status = 'finished'
    game.winner = winnerId
    game.finishedAt = new Date()

    const duration = Math.floor(
      (game.finishedAt.getTime() - game.startedAt.getTime()) / 1000
    )

    this.activeGames.delete(roomId)

    return { game, duration }
  }

  private generateDeck() {
    const suits = ['♠', '♥', '♦', '♣']
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    const deck = []

    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push({ suit, rank, id: `${rank}${suit}` })
      }
    }

    return deck.sort(() => Math.random() - 0.5)
  }

  private drawCards(count: number) {
    const deck = this.generateDeck()
    return deck.slice(0, count)
  }

  getGameState(roomId: number) {
    return this.activeGames.get(roomId)
  }
}

export const gameService = new GameService()
