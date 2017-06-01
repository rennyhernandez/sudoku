class Sudoku
  attr_accessor :board
  def initialize
    @board = []
  end

  # read input from standard I/O
  def read_input()
    @board = []
    (1..9).each do
      @board << gets.scan(/./).map(&:to_i)
    end
  end

  def read_input(board)
    @board = []
    board.each{|row| @board << row.scan(/./).map(&:to_i)}
  end

  def print_board()
    @board.each do |rows|
      rows.each do |p|
          printf "|%i", p
      end
      puts '|'
    end
  end
  def get_possibles(posX, posY)
    arr = @board[posX].clone
    (0..8).each{|i| arr << @board[i][posY]}
    (0..9).to_a - arr.uniq
  end
  def solve()
    board.each_with_index do |row, x|
      board.each_with_index do |val, y|
        if val == 0
          getPossibles(x,y)
        end
      end
    end
  end
  def board_test
    %w(
    003020060
    900305001
    001806400
    008102900
    700000008
    006708200
    002609500
    800203009
    005010300)
  end
end

