/-  *knox
|%
++  dejs-action
  =,  dejs:format
  |=  jon=json
  ^-  action
  %.  jon
  %-  of
  :~  [%add (ot ~[website+so username+so password+so])]
      [%edit (ot ~[id+ni website+so username+so password+so])]
      [%del (ot ~[id+ni])]
  ==
:: ++  enjs-update
::   =,  enjs:format
::   |=  upd=update
::   ^-  json
::   ~&  'upd'
::   ~&  upd
::   |^
::   ?-  -.q.upd
::       %vault
::     %-  pairs
::     :~
::       ['vault' a+(turn list.q.upd entry)]
:: ::    ['settings' s+'hi']
::     ==
::       %add
:: !!
:: ::    %-  pairs
:: ::    :~
:: ::      ['vault' a+(turn entry.q.upd entry)]
:: ::    ==
::       %edit
:: !!
:: ::    %-  pairs
:: ::    :~
:: ::      ['vault' a+(turn list.q.upd entry)]
:: ::    ==
::       %del
:: !!
:: ::    %-  pairs
:: ::    :~
:: ::      ['vault' a+(turn list.q.upd entry)]
:: ::    ==
::   ==
::   ++  entry
::     |=  ent=^entry
::     ^-  json
::     %-  pairs
::     :~
::       ['website' s+website.ent]
::       ['username' s+username.ent]
::       ['password' s+password.ent]
::     ==
::   --
--