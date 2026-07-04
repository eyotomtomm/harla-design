
import os

base = '/Users/designs/Downloads/Independency day/indochine/indochine-nextjs/src'

def w(rel, content):
    fp = os.path.join(base, rel)
    os.makedirs(os.path.dirname(fp), exist_ok=True)
    with open(fp, 'w') as f:
        f.write(content)
    print('Written: ' + rel)

print('Script loaded, writing files...')
