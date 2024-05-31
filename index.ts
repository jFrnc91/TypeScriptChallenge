class ConstructionGame {
    private board: number[][][] = []
    private readonly l: number
    private readonly w: number

    constructor(length: number, width: number) {
        this.l = length
        this.w = width
    }

    private addNewLevel(): void {
        const newLevel = []
        for(let i = 0; i < this.l; i++) {
            const newRow = []
            for(let j = 0; j < this.w; j++) {
                newRow.push(0)
            }
            newLevel.push(newRow)
        }
        this.board.push(newLevel)
    }

    private canRemoveFirstLevel(): boolean {
        for(let i = 0; i < this.board[0].length; i++) {
            for(let j = 0; j < this.board[0][0].length; j++) {
                if(this.board[0][i][j] === 0) {
                    return false
                }
            }
        }
        return true
    }

    private removeFirstLevel(): void {
        for(let i = 1; i < this.board.length; i++) {
            this.board[i - 1] = this.board[i]
        }
        this.board.pop()
    }

    public addCubes(cubes: boolean[][]): void {
        for(let i =  0; i < this.l; i++) {
            for(let j = 0; j < this.w; j++) {
                if(cubes[i][j]) {
                    let added = false
                    let level = 0
                    while(!added) {
                        if(this.board[level] === undefined) {
                            this.addNewLevel()
                        }
                        if(this.board[level][i][j] === 0) {
                            this.board[level][i][j] = 1;
                            added = true
                        }
                        else {
                            level++
                        }
                    }
                }
            }
        }
        if(this.canRemoveFirstLevel()) {
            this.removeFirstLevel()
        }
    }

    public getHeight(): number {
        return this.board.length;
    }
}

const game = new ConstructionGame(2, 2);

game.addCubes([
    [true, true],
    [false, false]
]);
game.addCubes([
    [true, true],
    [false, true]
]);
console.log(game.getHeight()); // should print 2

game.addCubes([
    [false, false],
    [true, true]
]);
console.log(game.getHeight()); // should print 1