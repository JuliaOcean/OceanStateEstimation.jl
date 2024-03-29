
"""
    CBIOMES_combine_files()

Take all files generated by `CBIOMES_model_climatogy.jl` and combine them into one file.
"""
function CBIOMES_combine_files()

fil_out=joinpath(tempdir(),"CBIOMES_clim.nc")
list_in=["Chl","EuphoticDepth","MLD","OceanDepth","PAR",
    "Rrs412","Rrs443","Rrs490","Rrs510","Rrs555","Rrs670",
    "SSS","SST","TKE","WindSpeed"]

##

!isfile(fil_out) ? cp(joinpath(tempdir(),"SST_clim.nc"),fil_out) : nothing

for ii in list_in
    ds = Dataset(fil_out,"a")
    if !haskey(ds,ii)
        fil_in=joinpath(tempdir(),ii*"_clim.nc")
        ds_in = Dataset(fil_in,"r")
        tmp11=ds_in[ii][:]
        u=ds_in[ii].attrib["units"]
        ln=ds_in[ii].attrib["long_name"]
        close(ds_in)

        ##

        v = defVar(ds,ii,Float64,("lon","lat","t"), 
        attrib = Dict("units" => u, "long_name" => ln))
        v[:] = tmp11
    end
    close(ds)
end

ds = Dataset(fil_out,"a")
ds.attrib["description,1"]="Source: Gael Forget"
ds.attrib["description,2"]="Product: CBIOMES-global climatology"
ds.attrib["description,3"]="Version: alpha"
if haskey(ds.attrib,"A")
    delete!(ds.attrib,"description")
    delete!(ds.attrib,"A")
    delete!(ds.attrib,"B")
end
close(ds)

"all set"
end
