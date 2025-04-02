local player = game:GetService("Players").LocalPlayer

local rs = game:GetService("ReplicatedStorage")
local ts = game:GetService("TweenService")
local tts = game:GetService("TextChatService")

local remotes = rs:WaitForChild("Remotes")
local storage = rs:WaitForChild("Storage")

local gui

local function createB(user:Model,num:number,p:boolean?)
	local model = game:GetService("AssetService"):CreateMeshPartAsync("rbxassetid://16041949190",{CollisionFidelity = Enum.CollisionFidelity.Box,RenderFidelity = Enum.RenderFidelity.Precise})

	model.Name = "BM"
	model.Material = Enum.Material.SmoothPlastic
	model.Size = Vector3.zero
	model.Massless = true
	model.CanCollide = false
	model.CanTouch = false
	model.CanQuery = false
	model.EnableFluidForces = false

	if game:GetService("Players"):GetPlayerFromCharacter(user):GetAttribute("BColor") ~= nil then
		model.Color = game:GetService("Players"):GetPlayerFromCharacter(user):GetAttribute("BColor")
	else
		model.Color = user.Torso.Color
	end

	if p == nil then
		for _, v in script.BM:GetChildren() do
			if not v:IsA("Attachment") and not v:IsA("HingeConstraint") and not v:IsA("Weld") then
				v:Clone().Parent = model
			elseif v.Name == "Bone" then
				v:Clone().Parent = model
			end
		end
		
		storage["B"..num].BM.BWeld:Clone().Parent = model

		model.Size = storage["B"..num].BM.Size

		model.CustomPhysicalProperties = PhysicalProperties.new(storage["B"..num].BM.CustomPhysicalProperties.Density,.5,1,.2,1)

		model.BWeld.Part0 = model
		model.BWeld.Part1 = user.Torso
		
		model:SetAttribute("Goal",storage["B"..num].BM:GetAttribute("Goal"))
	else
		for _, v in script.BM:GetChildren() do
			if not v:IsA("Attachment") and not v:IsA("HingeConstraint") and not v:IsA("Weld") then
				v:Clone().Parent = model
			end
		end

		for _, v in storage.pb["PB"..num].BM:GetChildren() do
			v:Clone().Parent = model
		end

		model.Size = storage.pb["PB"..num].BM.Size

		model.CustomPhysicalProperties = PhysicalProperties.new(storage.pb["PB"..num].BM.CustomPhysicalProperties.Density,.5,1,.2,1)
	end

	return model
end

player.CharacterAdded:Connect(function(c:Model)
	c:WaitForChild("Humanoid")

	c.Humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None
	workspace.CurrentCamera.CameraSubject = c.Humanoid
	
	c.Humanoid.Died:Once(function()
		gui.respawn.Visible = true
	end)
end)

gui = player.PlayerGui:WaitForChild("MainGui",99)

gui.Buttons.Release.MouseButton1Click:Connect(function()
	remotes.Release:FireServer()
end)

gui.Buttons.chooserbutton.MouseButton1Click:Connect(function()
	gui.Chooser.Visible = not gui.Chooser.Visible
	gui.backframe.Visible = not gui.backframe.Visible
end)

gui.Buttons.settings.MouseButton1Click:Connect(function()
	gui.settings.Visible = not gui.settings.Visible
end)

gui.Buttons.emotebutton.MouseButton1Click:Connect(function()
	gui.emotes.Visible = not gui.emotes.Visible
end)

gui.Chooser.close.MouseButton1Click:Connect(function()
	gui.backframe.Visible = false
	gui.Chooser.Visible = false
end)

gui.Chooser.Pr.Picker.MouseButton1Click:Connect(function()
	gui.backframe.Visible = false
	gui.Chooser.Visible = false
	gui.PRChooser.Visible = true
end)

gui.PRChooser.close.MouseButton1Click:Connect(function()
	gui.backframe.Visible = false
	gui.PRChooser.Visible = false
end)

remotes.NotifyPlayer.OnClientEvent:Connect(function(text:string,duration:number)
	local template = script.notitemplate:Clone()
	template.backframe.whatsup.Text = text
	template.Parent = gui.Notifcations

	game:GetService("SoundService")["Notify SFX - MGS5"]:Play()

	ts:Create(template.Frame,TweenInfo.new(duration,Enum.EasingStyle.Linear,Enum.EasingDirection.Out),{Size = UDim2.fromScale(1,1)}):Play()

	task.wait(duration)
	template:Destroy()
end)

remotes.CreateS.OnClientEvent:Connect(function(user:string)
	local bmodel = storage.be:Clone()
	bmodel.Parent = workspace.Stoms
	bmodel.Name = user
	bmodel:PivotTo(bmodel.WorldPivot * CFrame.new(math.random(-1000,1000),math.random(-1000,1000),math.random(-1000,1000)))
end)

remotes.ClearS.OnClientEvent:Connect(function(user:string)
	workspace.Stoms[user]:Destroy()
end)

remotes.ClearBn.OnClientEvent:Connect(function()
	if workspace.Stoms:FindFirstChild(player.Name) then
		workspace.Stoms[player.Name].Bns:ClearAllChildren()
	end
end)

remotes.CreateB.OnClientEvent:Connect(function(user:string,target:string,num:number)
	user = workspace.Characters[user]

	if user:FindFirstChild("BM") then
		task.defer(function()

			repeat
				task.wait()
			until workspace.Characters[target]:GetScale() <= .1
			
			user["BM"]:Destroy()

			if game:GetService("Players"):GetPlayerFromCharacter(user).Prs:FindFirstChild(player.Name) then
				task.delay(.1,function()
					workspace.CurrentCamera.CameraSubject = user.BM
				end)
			end
		end)
	end

	local b = createB(user,num)

	local circle = storage.circle:Clone()
	circle.Parent = user.Head

	if game:GetService("Players"):GetPlayerFromCharacter(user):GetAttribute("BColor") ~= nil then
		circle.Color = game:GetService("Players"):GetPlayerFromCharacter(user):GetAttribute("BColor")
	else
		circle.Color = user.Torso.Color
	end

	task.wait(.1)

	circle.Script.Disabled = false

	repeat
		task.wait()
	until workspace.Characters[target]:GetScale() <= .1
	
	if user.Name == player.Name then
		gui.Buttons.Release.Visible = true
		gui.Buttons.Dgst.Visible = true
		gui.Buttons.back2.Visible = true
		gui.Buttons.back3.Visible = true
		
		if num == 1 then
			b.CFrame = user.Torso.CFrame * CFrame.new(0,-b.BWeld.C0.Y/1.2,-b:GetAttribute("Goal").Z/2.1)
		elseif num == 3 then
			b.CFrame = user.Torso.CFrame * CFrame.new(0,(-b.Size.Y/3) + b.Size.Y/6.25,-b.Size.Z/1.45)
		elseif num <= 5 then
			b.CFrame = user.Torso.CFrame * CFrame.new(0,(-b.Size.Y/3) + b.Size.Y/6.25,-b.Size.Z/1.58)
		elseif num == 2 then
			b.CFrame = user.Torso.CFrame * CFrame.new(0,(-b.Size.Y/3) + b.Size.Y/14,-b.Size.Z/1.55)
		elseif num == 6 then
			b.CFrame = user.Torso.CFrame * CFrame.new(0,(-b.Size.Y/3) + b.Size.Y/6.25,-b.Size.Z/1.6)
		else
			b.CFrame = user.Torso.CFrame * CFrame.new(0,(-b.Size.Y/3) + b.Size.Y/5,-b.Size.Z/1.5)
		end
		
		local hinge = script.BM.HingeConstraint:Clone()
		hinge.Parent = b

		local attahcment = script.BM.Attachment:Clone()
		attahcment.Parent = b
		attahcment.WorldCFrame = user.Torso.CFrame * CFrame.new(0,-b.BWeld.C0.Position.Y,0) * CFrame.Angles(0,0,math.rad(90))

		hinge.Attachment0 = attahcment

		attahcment = script.BM.Attachment:Clone()
		attahcment.Parent = user.Torso
		attahcment.WorldCFrame = user.Torso.CFrame * CFrame.new(0,-b.BWeld.C0.Position.Y,0) * CFrame.Angles(0,0,math.rad(90))

		hinge.Attachment1 = attahcment
		
	elseif target == player.Name then
		task.defer(function()
			local bpos = remotes.GetBPos:InvokeServer(user.Name)
			workspace.Stoms[user.Name]:PivotTo(bpos)

			for i = 1, 1000 do
				task.wait()
				player.Character.HumanoidRootPart.CFrame = workspace.Stoms[user.Name].tppart.CFrame
			end
		end)
		
		b.BWeld.Enabled = true
		b.Bone.CFrame *= CFrame.Angles(0,math.rad(-90),0)
		
		game:GetService("SoundService").AmbientReverb = Enum.ReverbType.Cave

		game:GetService("SoundService").rah:Play()
		game:GetService("SoundService").fast:Play()

		gui.inside.Visible = true

		workspace.CurrentCamera.CameraSubject = b
	else
		b.BWeld.Enabled = true
		b.Bone.CFrame *= CFrame.Angles(0,math.rad(-90),0)
	end

	b.Parent = user
	b.Script.Disabled = false
	b.rah:Play()
	b.fast:Play()

	ts:Create(b,TweenInfo.new(.5,Enum.EasingStyle.Back,Enum.EasingDirection.Out),{Size = b:GetAttribute("Goal")}):Play()

	if game:GetService("Players"):GetPlayerFromCharacter(workspace.Characters[target]) == nil then
		-- dummy testing
		workspace.Characters[target].HumanoidRootPart.CFrame = workspace.Stoms[user.Name].tppart.CFrame
	end
end)

remotes.GetBPos.OnClientInvoke = function()
	return workspace.Stoms[player.Name].WorldPivot
end

remotes.Release.OnClientEvent:Connect(function(user:string)
	workspace.Characters[user].BM:Destroy()
end)

remotes.D.OnClientEvent:Connect(function(user:string)
	user = game:GetService("Players")[user]::Player

	local num = user:GetAttribute("Prs")
	local b = createB(user.Character,num)

	local playing = true
	
	if user.Name == player.Name then
		gui.Buttons.Release.Visible = false
		gui.Buttons.Dgst.Visible = false
		gui.Buttons.back2.Visible = false
		gui.Buttons.back3.Visible = false
	end
	
	if user:GetAttribute("PBell") ~= nil then
		if user:GetAttribute("PBell") == true then
			if user.Character:FindFirstChild("PB") then
				user.Character.PB:Destroy()
			end

			local b = createB(user.Character,user:GetAttribute("PBellM"),true)
			b.Parent = user.Character
			b.Name = "PB"
			b.BWeld.Part0 = b
			b.BWeld.Part1 = user.Character.Torso
			b.BWeld.Enabled = true
		end
	end

	if user.Prs:FindFirstChild(player.Name) or user.Name == player.Name then
		gui.dbar.Visible = true
		gui.dbar.moveme.Size = UDim2.fromScale(0,1)
		gui.dbar.moveme:TweenSize(UDim2.fromScale(1,1),Enum.EasingDirection.Out,Enum.EasingStyle.Linear,user:GetAttribute("DTime"))

		if user.Prs:FindFirstChild(player.Name) then
			task.delay(user:GetAttribute("DTime"),function()
				gui.dbar.Visible = false

				gui.respawn.Visible = true
			end)
		else
			task.delay(user:GetAttribute("DTime"),function()
				gui.dbar.Visible = false
			end)
		end
	end

	b.Size = user.Character.BM.Size

	user.Character.BM:Destroy()

	if num == 1 then
		b.CFrame = user.Character.Torso.CFrame * CFrame.new(0,-b.BWeld.C0.Y/1.2,-b:GetAttribute("Goal").Z/2.1)
	elseif num >= 3 and num <= 5 then
		b.CFrame = user.Character.Torso.CFrame * CFrame.new(0,(-b.Size.Y/3) + b.Size.Y/6.25,-b.Size.Z/2)
	elseif num == 2 then
		b.CFrame = user.Character.Torso.CFrame * CFrame.new(0,(-b.Size.Y/3) + b.Size.Y/14,-b.Size.Z/1.9)
	else
		b.CFrame = user.Character.Torso.CFrame * CFrame.new(0,(-b.Size.Y/3) + b.Size.Y/5,-b.Size.Z/1.8)
	end

	local hinge = script.BM.HingeConstraint:Clone()
	hinge.Parent = b

	local attahcment = script.BM.Attachment:Clone()
	attahcment.Parent = b
	attahcment.WorldCFrame = user.Character.Torso.CFrame * CFrame.new(0,-b.BWeld.C0.Position.Y,0) * CFrame.Angles(0,0,math.rad(90))

	hinge.Attachment0 = attahcment

	attahcment = script.BM.Attachment:Clone()
	attahcment.Parent = user.Character.Torso
	attahcment.WorldCFrame = user.Character.Torso.CFrame * CFrame.new(0,-b.BWeld.C0.Position.Y,0) * CFrame.Angles(0,0,math.rad(90))

	hinge.Attachment1 = attahcment

	local mod = Instance.new("Model")
	mod.Name = "B"..num
	mod.Parent = user.Character

	b.Parent = mod
	b.Script.Disabled = false

	b.fast:Play()

	b = mod

	task.defer(function()
		while playing and task.wait(.017) do
			if b:GetScale() - .04425 * math.clamp(num/1.95, 1, 5) > .04425 * math.clamp(num/1.95, 1, 5) then
				b:ScaleTo(b:GetScale() - .04425 * math.clamp(num/1.95, 1, 5) / (user:GetAttribute("DTime") * 1.51))

				if b:FindFirstChild("BM") then
					b.BM.Attachment.WorldCFrame *= CFrame.new(-.045 / user:GetAttribute("DTime"),0,0)
				end
			else
				playing = false
			end
		end
	end)

	if user:GetAttribute("DQuote") ~= "" then
		tts:DisplayBubble(user.Character,user:GetAttribute("DQuote"))
	end

	task.wait(user:GetAttribute("DTime"))

	b:Destroy()
end)

remotes.BAdd.OnClientEvent:Connect(function()
	if player:GetAttribute("BonesInB") == true then
		for i = 1, 8 do
			local clone = rs.Bone:Clone()
			clone:ScaleTo(math.random(350,1500)/1000)
			clone.Bone.CFrame = workspace.Stoms[player.Name].tppart.CFrame
			clone.Parent = workspace.Stoms[player.Name].Bns
			clone.Bone.BodyVelocity.Script.Disabled = false
		end

		local clone = rs.skully:Clone()
		clone:ScaleTo(math.random(900,1300)/1000)
		clone.skull.CFrame = workspace.Stoms[player.Name].tppart.CFrame
		clone.Parent = workspace.Stoms[player.Name].Bns
		clone.skull.BodyVelocity.Script.Disabled = false
	end

	if player:GetAttribute("ExpelB") == true then
		for i = 1, 8 do
			local clone = rs.Bone:Clone()
			clone:ScaleTo(math.random(350,450)/1000)
			clone.Bone.CFrame = player.Character.Head.CFrame * CFrame.new(0,0,-.5)
			clone.Parent = workspace.Bns
			clone.Bone.BodyVelocity.Script.Disabled = false
		end

		local clone = rs.skully:Clone()
		clone:ScaleTo(math.random(750,800)/1000)
		clone.skull.CFrame = player.Character.Head.CFrame * CFrame.new(0,0,-.5)
		clone.Parent = workspace.Bns
		clone.skull.BodyVelocity.Script.Disabled = false
	end
end)

game:GetService("SoundService").AmbientReverb = Enum.ReverbType.NoReverb
game:GetService("SoundService").fast:Stop()

local newf = Instance.new("Folder")
newf.Name = "Stoms"
newf.Parent = workspace

newf = Instance.new("Folder")
newf.Name = "Bns"
newf.Parent = workspace

newf = nil

repeat
	task.wait()
until player:GetAttribute("TReleased") ~= nil

player:GetAttributeChangedSignal("TReleased"):Connect(function()
	workspace.CurrentCamera.CameraSubject = script.Parent.Humanoid
	gui.inside.Visible = false

	game:GetService("SoundService").fast:Stop()
end)
