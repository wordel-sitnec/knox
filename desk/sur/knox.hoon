|%
+$  entry
  $:  website=@t
      username=@t
      password=@t
  ==
+$  entries  (list entry)
+$  action
  $%  [%add target=@p =entry]
      ::[%edit =entry]
      ::[%del =entry]
  ==
--