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
      [%sett (ot ~[setting-key+so setting-val+so])]
      [%gen (ot ~[enty+ni])]
  ==
++  enjs-update
  =,  enjs:format
  |=  upd=update
  ^-  json
  |^
  ?-  -.upd
           %gen  !!
           %sett  !!
           %add  
        %+  frond  'add'
        %-  pairs
        :~  ['website' s+website.upd]
            ['username' s+username.upd]
            ['password' s+password.upd]
        ==
           %edit
        %+  frond  'edit'
        %-  pairs
        :~  ['website' s+website.upd]
            ['username' s+username.upd]
            ['password' s+password.upd]
            ['id' (numb id.upd)]
        ==
           %del  (frond 'del' (numb id.upd))
           %enty  (frond 'enty' (numb enty.upd))
           %settings  (frond 'settings' a+(turn ~(tap by settings.upd) settings))
           %vault  (frond 'vault' a+(turn ~(tap by vault.upd) vault))
           %init
        %+  frond  'init'
        %-  pairs  
        :~  ['settings' a+(turn ~(tap by settings.upd) settings)]
            ['vault' a+(turn ~(tap by vault.upd) vault)]
        ==
    ==
    ++  settings
      |=  setting=[@tas @t]
      (frond `@t`-.setting s+(scot %tas +.setting))
    ++  vault
      |=  entry=[id=@ud [website=@t username=@t password=@t updated=@da]]
      %-  pairs
      :~  ['id' (numb id.entry)]
          ['website' s+(scot %tas website.entry)]
          ['username' s+(scot %tas username.entry)]
          ['password' s+(scot %tas password.entry)]
          ['updated' (time updated.entry)]
      ==
  --
--