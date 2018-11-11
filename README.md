[![Coverage Status](https://coveralls.io/repos/github/raickhr/monte_carlo/badge.svg?branch=master)](https://coveralls.io/github/raickhr/monte_carlo?branch=master)

# monte_carlo [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> This is second class project assignment for CHE 447, Univerisity of Rochester

## Setting up the input
The input file is a text file config.txt.

The first part is the list of nodes and its co-ordinates. Is is suggested that the nodes not lie in a line for edges not to seen overlapped in plots. The first node will be the source node for the first graph.

The second part starts with after blank line. It is the adjacency matrix. The matrix if is assymetric will be made symmetric to make the graph undirected.

The third part after another blank line is the value of parameter r

The fourth part is the value of parameter T

The final part is the maximum number iterations.

## Example of input 

(10, 12)  
(28, 12)  
(10, 28)  
(28, 28)  
(37, 19)  
  
0 1 1 1 0  
0 0 1 0 0  
1 1 0 0 0  
0 0 0 0 0  
0 1 0 0 0  
  
1  
  
30  
  
1000  

## Viewing the output

node server.js in the monte_carlo/lib/ folder gives starts the simulation. The output is displayed in the web browser at the address localhost:3000


## License

MIT © [Shikhar Rai]()


[npm-image]: https://badge.fury.io/js/monte_carlo.svg
[npm-url]: https://npmjs.org/package/monte_carlo
[travis-image]: https://travis-ci.org/raickhr/monte_carlo.svg?branch=master
[travis-url]: https://travis-ci.org/raickhr/monte_carlo
[daviddm-image]: https://david-dm.org/raickhr/monte_carlo.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/raickhr/monte_carlo
