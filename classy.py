#!/usr/bin/python

import sys
import re

def has_closing_brace(line):
    ''' searches a line for a closing brace, ignoring pairs '''
    brace_stack = 0
    for character in line:
        if character == '{':
            brace_stack += 1
            continue
        elif character == '}':
            brace_stack -= 1
            if brace_stack == -1:
                return True
            continue
        else:
            continue
    return False

class_definition = re.compile(r'^\w+ (\w+) = (\w+)\.extend\({$')
class_method = re.compile(r'^  (\w+): function (\(.*\) {)$')
class_member = re.compile(r'^  (\w+): (\w+),$')

if __name__ == '__main__':
    with open(sys.argv[1]) as f:
        for line in f:
            match = class_definition.match(line)
            if match is not None:
                print('class {} extends {}: {{'.format(match.group(1), match.group(2)))
                continue
            match = class_method.match(line)
            if match is not None:
                print('  {}{}'.format(match.group(1), match.group(2)))
                continue
            match = class_member.match(line)
            if match is not None:
                print('  get {}() {{ return {}; }}'.format(match.group(1), match.group(2)))
                continue
            print(line.rstrip())
