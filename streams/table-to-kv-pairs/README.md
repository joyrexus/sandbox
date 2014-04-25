## How do you represent tabular data in a key-value store?

### First off, how do you model a table as keys and values?

The most common approach is to flatten out the table structure into a sorted list of key/value pairs, each one representing a cell in the table. The key includes the full row and column identifier, which means each cell is provided complete addressing information. Null cells are simply not included in the list which makes this design particularly well-suited for sparse data.

So, the composite key is contructed from a tuple containing the row and column identifiers. You can make your key namespace row-oriented or column-oriented by placing either the row or column first in the tuple, respectively. Because the lexicographic order sorts tuple elements from left to right, access is optimized for the element placed first. Placing the row first makes it efficient to read all the cells in a particular row; reversing the order makes reading a column more efficient.

### OK, how do you model multiple tables?

To represent multiple tables, you can partition your key namespace by adding table identifiers to your composite key: `(table, row, column)`.

For more, see this [data modeling overview](https://foundationdb.com/documentation/data-modeling.html) for key-value storage.
