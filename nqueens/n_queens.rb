class NQueens
  attr_accessor :board
  def initialize(n)
    @board = []
    (0..n-1).each do |i|
      @board[i] = []
      (0..n-1).each do |j|
        @board[i][j] = 0
      end
    end
  end

  def print_board
    (0..board.length - 1).each do |i|
      (0..board.length - 1).each do |j|
        printf "|%i", @board[i][j]
      end
      puts '|'
    end
  end

  def solve(n)
    if(place_queens(0, n))
      print_board
    else
      puts 'there is no solution'
    end
  end

  def place_queens(queens, n)
    if(queens.equal? n)
       true
    end
    for row in (0..n-1)
      if(can_place(board, row, queens))
        @board[row][queens] = 1
        if(place_queens(queens + 1, n))
          print_board
          true
        end
        @board[row][queens] = 0
      end
    end
    false
  end

  def can_place(board, row, column)
    if(board[row].include? 1)
      print_board
      false
    end
    #check upper diagonal
    i = row
    j = column
    until i >= 0 and j >= 0 do
      if (board[i][j] == 1)
        print_board
        false
      end
      i-=1
      j-=1
    end
    #check lower diagonal
    i = row
    j = column
    until i < board.length and j >= 0 do
      if (board[i][j] == 1)
        false
      end
      i+=1
      j-=1
    end
    true
  end
end

queens = NQueens.new(8)

queens.print_board

queens.solve(8)