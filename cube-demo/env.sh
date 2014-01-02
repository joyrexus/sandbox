CUBE=/Users/joyrexus/Repos/mine/sandbox/cube-demo/node_modules/cube

alias collector='cd $CUBE; node bin/collector &'
alias evaluator='cd $CUBE; node bin/evaluator &'

start () {
    cd $CUBE
    node bin/collector.js 2>&1 >> /usr/local/var/log/cube/collector.log &
    node bin/evaluator.js 2>&1 >> /usr/local/var/log/cube/evaluator.log &
}

quit () { 
    ps aux                      \
        | grep -e 'collector'   \
               -e 'evaluator'   \
        | grep -v 'grep'        \
        | awk '{print $2}'      \
        | xargs -I % kill -s KILL %
}

export CUBE
export -f quit
