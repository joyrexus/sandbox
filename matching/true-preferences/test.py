from match import Matcher

# the men and their list of ordered spousal preferences
M = {
  'm1': ["w1", "w2", "w3"],
  'm2': ["w1", "w3", "w2"],
  'm3': ["w2", "w1", "w3"]
}

# the women and their list of ordered spousal preferences
W = {
  'w1': ["m3", "m2", "m1"],
  'w2': ["m2", "m1", "m3"],
  'w3': ["m2", "m1", "m3"]
}

# check if a mapping of wives to husbands is stable
def is_stable(wives, verbose=False):
    for w, m in wives.items():
        i = M[m].index(w)
        preferred = M[m][:i]
        for p in preferred:
            h = wives[p]
            if W[p].index(m) < W[p].index(h):  
                msg = "{}'s marriage to {} is unstable: " + \
                      "{} prefers {} over {} and {} prefers " + \
                      "{} over her current husband {}"
                if verbose:
                    print msg.format(m, w, m, p, w, p, m, h) 
                return False
    return True

# a mapping from men to their top preferences
top = dict((m, rank[0]) for m, rank in M.items()) 

# match men and women; returns a mapping of wives to husbands
matcher = Matcher(M, W)
wives = matcher.match(M.keys())
assert is_stable(wives)             # should be a stable matching
assert wives['w1'] is 'm3'          # `w1` is married to `m3`

# now change prefs of woman `w1` and rematch
W['w1'] = ["m3", "m1", "m2"]
matcher = Matcher(M, W)
wives = matcher.match(M.keys())
assert is_stable(wives)             # should be a stable matching
assert wives['w1'] is 'm1'          # but `w1` is now married to `m1`
