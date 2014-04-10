# the men and their list of ordered spousal preferences
M = dict((m, prefs.split(', ')) for [m, prefs] in (line.rstrip().split(': ')
                                for line in open('men.txt')))

# the women and their list of ordered spousal preferences
W = dict((m, prefs.split(', ')) for [m, prefs] in (line.rstrip().split(': ')
                                for line in open('women.txt')))

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

# test whether w prefers m over h
def prefers(w, m, h):
    return W[w].index(m) < W[w].index(h)

# return the woman favored by m after w
def after(m, w):
    prefs = M[m]            # m's ordered list of preferences
    i = prefs.index(w) + 1  # woman following w in list of prefs
    return prefs[i]

# try to match all men with their next preferred spouse
def match(men, next={}, wives={}):
    if not len(men): return wives
    m, men = men[0], men[1:]
    w = next[m]                     # next woman for m to propose to
    next[m] = after(m, w)           # woman after w in m's list of prefs
    if w in wives:
        h = wives[w]                # current husband
        if prefers(w, m, h):
            men.append(h)           # husband becomes available again
            wives[w] = m            # w becomes wife of m
        else:
            men.append(m)           # m remains unmarried
    else:
        wives[w] = m                # w becomes wife of m
    return match(men, next, wives)

# a mapping from men to their top preferences
top = dict((m, rank[0]) for m, rank in M.items()) 

# match men and women; returns a mapping of wives to husbands
wives = match(M.keys(), top)

assert is_stable(wives)             # should be a stable matching

# swap the husbands of two wives, which should make the matching unstable
wives['fay'], wives['gay'] = wives['gay'], wives['fay']

assert is_stable(wives) is False    # should not be a stable matching

# with the perturbed matching we find that gav's marriage to fay is unstable: 
# gav prefers gay over fay and gay prefers gav over her current husband dan
