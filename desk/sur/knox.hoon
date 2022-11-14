|%
+$  website   @t
+$  username  @t
+$  password  @t
+$  entry  [=website =username =password]
:: +$  setting  $:(@t @t)
:: poke actions
+$  action
  $%  [%add =entry]
      [%edit =entry]
      [%del =entry]
  ==
+$  update
  %+  pair  @
  $%  action
      [%vault list=(list entry)]
::    [%settings list=(list setting)]
  ==
:: types for agent state
+$  vault  (list entry)
--
