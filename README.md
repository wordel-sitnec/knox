# Knox

Knox is a vault for your web2 passwords.

## Proposal

### The Problem

Everyone here basically agrees - the internet is broken, the megacorps are predators, Urbit solves this, etc. etc. What Urbit doesn't solve in the immediate term is the entrenchment of web2 services from which many of us are not yet able (whether ready or not) to eject. Some solutions tangential to this space have already been developed, most notably dcSpark's Urbit Visor. Waiting for the services we still rely on to adopt log in with Urbit may be a pipe dream, and their eventual extinction is not imminent enough. Many of us still need an email address and a password to log in to pay our utilities, and I'll speak for many more in saying we wish Urbit could handle this for us.

Enter Knox.

### The Purpose

Knox is a vault for your web2 passwords. With it running on one's ship, a user can generate strong passwords, easily cycle passwords, autofill login forms with the correct credentials, trivially grab an arbitrary password with a command, and manage all of this with an easy-to-use client interface. It does everything you expect a first class password manager (BitWarden, LastPass) to do, but it lives on your urbit.

As of this writing, the basic architecture for such an app is assumed to be 1) a Gall agent, 2) a browser interface, and 3) a chromium extension. I also intend to leverage the urbit visor/command launcher for some maximally convenient features, such as quick-grabbing an arbitrary password with a well-formed scry or quickly generating a password. Much of this functionality will be extended into the Knox extension as well.

Technical details/best practices for many aspects of this project will require some research. Most notable examples include best practice for storing passwords and for transferring passwords over http.

### Milestones

#### Milestone 1 - MVP

Through the web client, user can

- view all saved entries (website, username, password)
- generate a new password
- save a new entry
- edit an entry (change username/password)
- delete an entry

Through the command launcher, user can -

- generate a new password

#### Milestone 2 - Web Extension

Stand alone extension - brings all the functionality of client to extension

- Primary extension feature is auto-populating username/password fields if on known website

#### Other Features to Come -

- Export - easily get some report of all existing accounts/passwords. Good for having a physical backup, preparation for risky software/hardware tinkering, etc
- %docs integration

## %knox - desk

The desk currently has the minimum amount of files necessary to distribute an application and should be distributable immediately. Any further Hoon development should happen here.

TODO: Add further documentation on beginning Hoon development

## %knox - ui

The Knox web client is built primarily using [React], [Typescript], and [Tailwind CSS]. [Vite] ensures that all code and assets are loaded appropriately, bundles the application for distribution and provides a functional dev environment.

### Getting Started

To get started using Knox first you need to run `npm install` inside the `ui` directory.

To develop you'll need a running ship to point to. To do so you first need to add a `.env.local` file to the `ui` directory. This file will not be committed. Adding `VITE_SHIP_URL={URL}` where **{URL}** is the URL of the ship you would like to point to, will allow you to run `npm run dev`. This will proxy all requests to the ship except for those powering the interface, allowing you to see live data.

Regardless of what you run to develop, Vite will hot-reload code changes as you work so you don't have to constantly refresh.

### Deploying

To deploy, run `npm run build` in the `ui` directory which will bundle all the code and assets into the `dist/` folder. This can then be made into a glob by doing the following:

1. Create or launch an urbit using the -F flag
2. On that urbit, if you don't already have a desk to run from, run `|merge %work our %base` to create a new desk and mount it with `|mount %work`.
3. Now the `%work` desk is accessible through the host OS's filesystem as a directory of that urbit's pier ie `~/zod/work`.
4. From the `ui` directory you can run `rsync -avL --delete dist/ ~/zod/work/knox` where `~/zod` is your fake urbit's pier.
5. Once completed you can then run `|commit %work` on your urbit and you should see your files logged back out from the dojo.
6. Now run `=dir /=garden` to switch to the garden desk directory
7. You can now run `-make-glob %work /knox` which will take the folder where you just added files and create a glob which can be thought of as a sort of bundle. It will be output to `~/zod/.urb/put`.
8. If you navigate to `~/zod/.urb/put` you should see a file that looks like this `glob-0v5.fdf99.nph65.qecq3.ncpjn.q13mb.glob`. The characters between `glob-` and `.glob` are a hash of the glob's contents.
9. Now that we have the glob it can be uploaded to any publicly available HTTP endpoint that can serve files. This allows the glob to distributed over HTTP.
10. Once you've uploaded the glob, you should then update the corresponding entry in the docket file at `desk/desk.docket-0`. Both the full URL and the hash should be updated to match the glob we just created, on the line that looks like this:

```hoon
    glob-http+['https://bootstrap.urbit.org/glob-0v5.fdf99.nph65.qecq3.ncpjn.q13mb.glob' 0v5.fdf99.nph65.qecq3.ncpjn.q13mb]
```

11. This can now be safely committed and deployed.

[react]: https://reactjs.org/
[typescript]: https://www.typescriptlang.org/
[tailwind css]: https://tailwindcss.com/
[vite]: https://vitejs.dev/
