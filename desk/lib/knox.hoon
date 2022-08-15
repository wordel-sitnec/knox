/-  *knox
|%
++  to-js
  |=  ent=entry
  |^  ^-  json
  %-  pairs:enjs:format
  :~
    ['website' s+website.ent]
    ['username' s+username.ent]
    ['password' s+password.ent]
  ==
--
++  from-js
  =,  dejs:format
  ^-  $-(json entry)
  %-  ot
  :~
    [%website so]
    [%username so]
    [%password so]
  ==
--