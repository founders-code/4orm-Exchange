#!/usr/bin/env bash
# Pre-commit checks for 4ormex.com. All must pass before pushing.
# This file does not ship. See .vercelignore.
#
#   ./check.sh
#
set -uo pipefail
cd "$(dirname "$0")"

WEB=(--glob '*.html' --glob '*.css' --glob '*.js' --glob '*.svg' --glob '*.json')
fail=0

run () {           # run <label> <rg args...>
  local label="$1"; shift
  local out
  out=$(rg "$@" "${WEB[@]}" . 2>/dev/null)
  if [ -n "$out" ]; then
    printf '\033[31mFAIL\033[0m  %s\n%s\n\n' "$label" "$out"
    fail=1
  else
    printf '\033[32m ok \033[0m  %s\n' "$label"
  fi
}

echo
run "no em-dash or en-dash"      -P '[\x{2014}\x{2013}]'
run "no standalone AI token"     -wi 'AI'
run "no smart or curly quotes"   -P '[\x{201C}\x{201D}\x{2018}\x{2019}]'
run "no prior-venture language"  -i -f .banned-venture
run "no method vocabulary"       -i -f .banned-method
run "no commercial figures"      -i -f .banned-commercial

echo
if [ "$fail" -eq 0 ]; then
  printf '\033[32mAll checks passed.\033[0m\n\n'
else
  printf '\033[31mBlocked. Fix the above before committing.\033[0m\n\n'
fi
exit "$fail"
