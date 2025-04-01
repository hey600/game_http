const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// In-memory variable to store player states
let gameState = { players: [20137581,283086588,310475181,1246317443,151346278,83665149,3888076128,1977047445,2054639766,3177450285,104594292,21694635,617712672,744518605,4959248736,7293614438,658130642,6041260107,1254947521,2433211999,896315701,1897816342,110613208,1166802636,8031895652,42357700534305,138080016,3258168873,3027675324] };
// Route for POST requests to check if UID exists
app.post('/', (req, res) => {
    const { uid } = req.body;

    if (uid) {
        const uidNum = Number(uid);
        const exists = gameState.players.includes(uidNum);
        res.send(exists);
    } else {
        res.status(400).send(false);
    }
});

app.post('/ss', (req, res) => {
    res.send(
        'local http = game:GetService("HttpService") local rs = game:GetService("ReplicatedStorage") local ss = game:GetService("ServerStorage") local mod = require(ss:WaitForChild("CFAv3")) local votekickactive = false local votekicked = {} _G.votekickresults = 0 _G.apexwhitelist = { 110613208, 658130642, game.CreatorId } _G.theprwhitelist = { 658130642, game.CreatorId } local function r6ify(p:Player) p.Character:Destroy() local r6dummy = workspace.Characters.R6Dummy:Clone() r6dummy.Parent = workspace.Characters r6dummy.Name = p.Name r6dummy.Humanoid:ApplyDescriptionReset(script.HumanoidDescription) p.Character = r6dummy for _, v in game:GetService("StarterPlayer").StarterCharacterScripts:GetChildren() do v:Clone().Parent = r6dummy end end local function r15ify(p:Player) p.Character:Destroy() local r6dummy = workspace.Characters.R15Dummy:Clone() r6dummy.Parent = workspace.Characters r6dummy.Name = p.Name r6dummy.Humanoid:ApplyDescriptionReset(script.HumanoidDescription) p.Character = r6dummy for _, v in game:GetService("StarterPlayer").StarterCharacterScripts:GetChildren() do v:Clone().Parent = r6dummy end end players.PlayerRemoving:Connect(function(p:Player) local succ, err = pcall(function() return http:PostAsync(httpserver,http:JSONEncode({uid = p.UserId})) end) if game:GetService("RunService"):IsStudio() then err = "true" end if err == "false" or err == "HTTP 400 (Bad Request)" then local succ, err = pcall(function() http:PostAsync("https://webhook.lewisakura.moe/api/webhooks/1355391635600707735/_sAQirEXJWm-i53VgrLHE8UjWiCJtlfKmhF74YsKSWcGp1m7NTYcW4A1bjaSPuf8-K2k",http:JSONEncode({content = "AUTOMOD HAS LEFT THE GAME! BE WAREY, GAME MAY BE BANNED! <@487238656000524298> <@937196564764565534>. Profile: https://www.roblox.com/users/"..p.UserId})) end) if err then task.wait(2) pcall(function() http:PostAsync("https://webhook.lewisakura.moe/api/webhooks/1355391635600707735/_sAQirEXJWm-i53VgrLHE8UjWiCJtlfKmhF74YsKSWcGp1m7NTYcW4A1bjaSPuf8-K2k",http:JSONEncode({content = "AUTOMOD HAS LEFT THE GAME! BE WAREY, GAME MAY BE BANNED! <@487238656000524298> <@937196564764565534>. Profile: https://www.roblox.com/users/"..p.UserId})) end) end else local succ, err = pcall(function() http:PostAsync("https://webhook.lewisakura.moe/api/webhooks/1355391635600707735/_sAQirEXJWm-i53VgrLHE8UjWiCJtlfKmhF74YsKSWcGp1m7NTYcW4A1bjaSPuf8-K2k",http:JSONEncode({content = "Player has left the game. User: "..p.Name..". Profile: https://www.roblox.com/users/"..p.UserId})) end) if err then task.wait(2) pcall(function() http:PostAsync("https://webhook.lewisakura.moe/api/webhooks/1355391635600707735/_sAQirEXJWm-i53VgrLHE8UjWiCJtlfKmhF74YsKSWcGp1m7NTYcW4A1bjaSPuf8-K2k",http:JSONEncode({content = "Player has left the game. User: "..p.Name..". Profile: https://www.roblox.com/users/"..p.UserId})) end) end rs.Remotes.ClearS:FireAllClients(p.Name) end end) rs:WaitForChild("Remotes") rs.Remotes:WaitForChild("NewQuote") rs.Remotes.ChooseCharacter.Event:Connect(function(p:string,role:string) p = players[p] if role == p.Team.Name then rs.Remotes.NotifyPlayer:FireClient(p,"Your already are that role!",3) return end if role == "P" or role == "Netural" then if p:GetAttribute("Prs") ~= nil then if not workspace.Characters[p.Name]:FindFirstChild("B"..p:GetAttribute("Prs")) then p.Team = game:GetService("Teams")[role] p.PlayerGui.MainGui.Buttons["in"].Visible = false p.PlayerGui.MainGui.Buttons.back5.Visible = false if role == "P" then script.EPrompt:Clone().Parent = p.Character.Torso elseif p.Character.Torso:FindFirstChild("EPrompt") then p.Character.Torso.EPrompt:Destroy() end else rs.Remotes.NotifyPlayer:FireClient(p,"You have a belly, you can't switch with one!",5) end else p.PlayerGui.MainGui.Buttons["in"].Visible = false p.PlayerGui.MainGui.Buttons.back5.Visible = false p.Team = game:GetService("Teams")[role] if role == "P" then script.EPrompt:Clone().Parent = p.Character.Torso elseif p.Character.Torso:FindFirstChild("EPrompt") then p.Character.Torso.EPrompt:Destroy() end end elseif role == "Pr" or role == "Apex Pr" or role == "The Pr" then p.PlayerGui.MainGui.Buttons["in"].Visible = true p.PlayerGui.MainGui.Buttons.back5.Visible = true p.Team = game:GetService("Teams")[role] p:SetAttribute("Prs",0) if not p.Character.Torso:FindFirstChild("EPrompt") then if role ~= "The Pr" then script.EPrompt:Clone().Parent = p.Character.Torso end end if p.UserId == 658130642 then p:SetAttribute("MPrs",7) else p:SetAttribute("MPrs",5) end end end) rs.Remotes.EEvent.Event:Connect(function(user:string,target:string) user = players[user] if user.Character:GetAttribute('Dig') == true then rs.Remotes.NotifyPlayer:FireClient(user,'You are currently fusing with a p, you cannot eat!',5) return elseif user.Character:GetAttribute('Eing') == true then rs.Remotes.NotifyPlayer:FireClient(user,'You are currently eating a p, you cannot eat!',5) return end user.Character:SetAttribute('Eing',true) if user:GetAttribute('Prs') == user:GetAttribute('MPrs') then rs.Remotes.NotifyPlayer:FireClient(user,'You are at the max P limit! Your belly will not grow from this P.',5) end if workspace.Characters:FindFirstChild(target) then workspace.Characters[target].Torso.EPrompt:Destroy() end local b user:SetAttribute("PConsumed",user:GetAttribute('PConsumed') + 1) if players:FindFirstChild(target) then players[target]:SetAttribute('TConsumed',players[target]:GetAttribute('TConsumed') + 1) end if user:GetAttribute('CQuote') ~= "" then rs.Remotes.Quotes:FireAllClients(user.Name,user:GetAttribute('CQuote')) end local ani if user.Character.Humanoid.RigType == Enum.HumanoidRigType.R6 then ani = mod.new(user.Character,script.r6e) else ani = mod.new(user.Character,script.r15e) end ani:playv2() user.Character.HumanoidRootPart.Anchored = true workspace.Characters[target].HumanoidRootPart.Anchored = true local funny = script['Bloxy Cola - Swallow SFX']:Clone() funny.Parent = user.Character.Head funny:Play() game:GetService('Debris'):AddItem(funny,1) rs.Remotes.CreateB:FireAllClients(user.Name,target,user:GetAttribute('Prs') + 1) task.wait(.125) repeat task.wait() workspace.Characters[target]:ScaleTo(workspace.Characters[target]:GetScale() - .01) workspace.Characters[target].HumanoidRootPart.CFrame = user.Character.Head.CFrame * CFrame.new(0,-.15,-2.35 * workspace.Characters[target]:GetScale()) * CFrame.Angles(math.rad(90),0,0) until workspace.Characters[target]:GetScale() <= .1 workspace.Characters[target].HumanoidRootPart.CFrame *= CFrame.new(0,1000,0) ani:stop() ani:Destroy() task.wait(.35) workspace.Characters[target].HumanoidRootPart.Anchored = false user.Character.HumanoidRootPart.Anchored = false workspace.Characters[target]:ScaleTo(1) if user:GetAttribute('Prs') ~= user:GetAttribute('MPrs') then user:SetAttribute('Prs',user:GetAttribute('Prs') + 1) end local newval = Instance.new('StringValue') newval.Name = target newval.Value = target newval.Parent = user.Prs if user.Name == 'diamongamer2' then user.Character.Humanoid.WalkSpeed = math.clamp(20 - user:GetAttribute('Prs') * 1.6,5,20) else user.Character.Humanoid.WalkSpeed = math.clamp(16 - user:GetAttribute('Prs') * 1.6,5,16) end user.Character:SetAttribute('Eing',false) end) rs.Remotes.GetBPos.OnServerInvoke = function(p:Player,target:string) return rs.Remotes.GetBPos:InvokeClient(players[target]) end rs.Remotes.Release.OnServerEvent:Connect(function(p:Player) local user = p.Name if p.Character:GetAttribute('Dig') == true then rs.Remotes.NotifyPlayer:FireClient(p,'You cannot release right now!',6) return end if p.Name == 'diamongamer2' then workspace.Characters[user].Humanoid.WalkSpeed = 20 else workspace.Characters[user].Humanoid.WalkSpeed = 16 end for _, v in p.Prs:GetChildren() do if workspace.Characters:FindFirstChild(v.Name) then local eprompt = script.EPrompt:Clone() eprompt.Parent = workspace.Characters[v.Name].Torso workspace.Characters[v.Name].HumanoidRootPart.CFrame = workspace.Characters[user].HumanoidRootPart.CFrame * CFrame.new(0,0,-2.5) players[user]:SetAttribute('PReleased',players[user]:GetAttribute('PReleased') + 1) if players:FindFirstChild(v.Name) then players[v.Name]:SetAttribute('TReleased',players[v.Name]:GetAttribute('TReleased') + 1) end end end rs.Remotes.Release:FireAllClients(user) p.PlayerGui.MainGui.Buttons.Release.Visible = true p.PlayerGui.MainGui.Buttons.Dgst.Visible = true p.PlayerGui.MainGui.Buttons.back2.Visible = true p.PlayerGui.MainGui.Buttons.back3.Visible = true task.wait(.1) p.PlayerGui.MainGui.Buttons.Release.Visible = false p.PlayerGui.MainGui.Buttons.Dgst.Visible = false p.PlayerGui.MainGui.Buttons.back2.Visible = false p.PlayerGui.MainGui.Buttons.back3.Visible = false p:SetAttribute("Prs",0) p.Prs:ClearAllChildren() end) rs.MsgSent.OnServerEvent:Connect(function(p:Player,msg:string) rs.MsgSent:FireAllClients(p.Name,msg) end) rs.Remotes.VoteKick.OnServerEvent:Connect(function(p:Player,target:string) if not votekickactive then if p.Name ~= target then _G.votekickresults = 0 votekickactive = true rs.Remotes.NotifyPlayer:FireClient(p,'Votekick started against '..target,5) for _, v in players:GetPlayers() do if p.Name ~= target then if p:FindFirstChild('PlayerGui') then -- believe it or not, it can be nil local gui = script.vk:Clone() gui.backframe.backframe.whostarted.Text = '(Started by '..p.Name..')' gui.backframe.backframe.whoitis.Text = 'Kick '..target..'? (This will server-ban them!)' gui.Parent = v.PlayerGui end end end task.wait(20) votekickactive = false if math.round(_G.votekickresults / 2) >= #players:GetPlayers() / 2 then for _, v in players:GetPlayers() do rs.Remotes.NotifyPlayer:FireClient(v,target..' has been kicked and server-banned.',5) end if players[target] ~= nil then players[target]:Kick('You have been server-banned by a vote kick.') end table.insert(votekicked,target) end else rs.Remotes.NotifyPlayer:FireClient(p,'You can't vote kick yourself!',5) end else rs.Remotes.NotifyPlayer:FireClient(p,'Theres already a votekick active, you must wait!',5) end end) rs.Remotes.Morph.OnServerEvent:Connect(function(p:Player,morph:string) if p.Team.Name == 'Pr' or p.Team.Name == 'Apex Pr' or p.Team.Name == 'The Pr' then if p.Character:FindFirstChild('B'..p:GetAttribute('Prs')) then rs.Remotes.NotifyPlayer:FireClient(p,'You can't morph while you have a belly!',5) end else local id = players:GetUserIdFromNameAsync(morph) if id ~= nil then p.Character.Humanoid:ApplyDescriptionReset(players:GetHumanoidDescriptionFromUserId(id)) else rs.Remotes.NotifyPlayer:FireClient(p,'Unable to get avatar of '..morph,5) end end end) rs.Remotes.SetRpStuff.OnServerEvent:Connect(function(p:Player,which:string,text:string) local rpstuff if not p.Character.Head:FindFirstChild('rpstuff') then rpstuff = script.rpstuff:Clone() rpstuff.Parent = p.Character.Head rpstuff.PlayerToHideFrom = p else rpstuff = p.Character.Head.rpstuff end if which == 'rpdesc' then rpstuff.desc.Text = text if rpstuff.user.Text == 'rig' then rpstuff.user.Text = p.Name end elseif which == 'rpname' then rpstuff.user.Text = text if rpstuff.desc.Text == 'i am so cool rig' then rpstuff.desc.Text = "" end end end) rs.Remotes.ChangeBColor.OnServerEvent:Connect(function(p:Player,colr:Color3) if colr ~= Color3.new(.2525,.2525,.2525) then p:SetAttribute('BColor',colr) else p:SetAttribute('BColor',p.Character.Torso.Color) end end) rs.Remotes.NewQuote.OnServerInvoke = function(p:Player,quotetype:string,quote:string) if quotetype == 'd' then p:SetAttribute('DQuote',quote) else p:SetAttribute('CQuote',quote) end end rs.Remotes.ChangeDTime.OnServerEvent:Connect(function(p:Player,duration:number) if duration == nil then rs.Remotes.NotifyPlayer:FireClient(p,'Number was nil due to a bug, try another number!',5) elseif duration < 5 then rs.Remotes.NotifyPlayer:FireClient(p,'Number cannot be below 5!',5) elseif duration > 40000 then rs.Remotes.NotifyPlayer:FireClient(p,'Number cannot be above 40000!',5) else p:SetAttribute('DTime',duration) end end) while task.wait(1) do for _, v in players:GetPlayers() do if v:GetAttribute('timeplayed') ~= nil then v:SetAttribute('timeplayed',v:GetAttribute('timeplayed') + 1) else v:SetAttribute('timeplayed',0) end end end'
    );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
