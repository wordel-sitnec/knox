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
  ==
++  enjs-update
  =,  enjs:format
  |=  upd=update
  ^-  json
  |^
  ?-  -.upd
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
            ['id' s+(scot %ud id.upd)]
        ==
           %del  (frond 'del' s+(scot %ud id.upd))
           %sett  !!
           %vault  (frond 'vault' a+(turn ~(tap by vault.upd) vault))
           %init
        %+  frond  'init'
        %-  pairs  
        :~  ['settings' a+(turn ~(tap by settings.upd) settings)]
            ['vault' a+(turn ~(tap by vault.upd) vault)]
        ==
    ==
    ++  settings
      |=  setting=[@t @t]
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