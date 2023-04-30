module ScratchSpaces

using Downloads, Scratch

# This will be filled in inside `__init__()`
ECCO = ""
OCCA = ""
CBIOMES = ""
MITprof = ""

# Downloads a resource, stores it within path
function download_dataset(url,path)
    fname = joinpath(path, basename(url))
    if !isfile(fname)
        Downloads.download(url, fname)
    end
    return fname
end

function __init__()
    global ECCO = @get_scratch!("ECCO")
    global OCCA = @get_scratch!("OCCA")
    global CBIOMES = @get_scratch!("CBIOMES")
    global MITprof = @get_scratch!("MITprof")
end

end

##

module downloads

using OceanStateEstimation: pkg_pth
using OceanStateEstimation: ScratchSpaces
using Tar, CodecZlib
using Statistics, FortranFiles, MeshArrays, MITgcmTools
using Dataverse

##

"""
    MITPROFclim_download()

Download lazy artifact to scratch space.
"""   
function MITPROFclim_download()
    url = "https://zenodo.org/record/5101243/files/gcmfaces_climatologies.tar.gz"
    fil="gcmfaces_climatologies.tar.gz"
    dir_out=joinpath(ScratchSpaces.MITprof,fil[1:end-7])
    if !isdir(dir_out)
        ScratchSpaces.download_dataset(url,ScratchSpaces.MITprof)
        tmp_path=open(joinpath(ScratchSpaces.MITprof,fil)) do io
            Tar.extract(CodecZlib.GzipDecompressorStream(io))
        end
        mv(tmp_path,dir_out)
        rm(joinpath(ScratchSpaces.MITprof,fil))
    end
end
    
"""
    CBIOMESclim_download()

Download lazy artifact to scratch space.
"""
function CBIOMESclim_download()
    url="https://zenodo.org/record/5598417/files/CBIOMES-global-alpha-climatology.nc.tar.gz"
    fil="CBIOMES-global-alpha-climatology.nc.tar.gz"
    fil_out=joinpath(ScratchSpaces.CBIOMES,fil[1:end-7])
    if !isfile(fil_out)
        ScratchSpaces.download_dataset(url,ScratchSpaces.CBIOMES)
        tmp_path=open(joinpath(ScratchSpaces.CBIOMES,fil)) do io
            Tar.extract(CodecZlib.GzipDecompressorStream(io))
        end
        mv(joinpath(tmp_path,fil[1:end-7]),fil_out)
        rm(joinpath(ScratchSpaces.CBIOMES,fil))
    end
end

## Dataverse Donwloads

"""
    get_ecco_files(γ::gcmgrid,v::String,t=1)

```
using MeshArrays, OceanStateEstimation
γ=GridSpec("LatLonCap",MeshArrays.GRID_LLC90)
tmp=get_ecco_files(γ,"oceQnet")
```
"""
function get_ecco_files(γ::gcmgrid,v::String,t=1)
    get_ecco_variable_if_needed(v)
    return read_nctiles(joinpath(ScratchSpaces.ECCO,"$v/$v"),"$v",γ,I=(:,:,t))
end

"""
    get_ecco_variable_if_needed(v::String)

Download ECCO output for variable `v` to scratch space if needed
"""
function get_ecco_variable_if_needed(v::String)
    lst0=Dataverse.file_list("doi:10.7910/DVN/3HPRZI")
    lst=Dataverse.url_list(lst0)

    fil=joinpath(ScratchSpaces.ECCO,v,v*".0001.nc")
    if !isfile(fil)
        pth1=joinpath(ScratchSpaces.ECCO,v)
        lst1=findall([v==n[1:end-8] for n in lst.name])
        !isdir(pth1) ? mkdir(pth1) : nothing
        [Dataverse.file_download(lst,v,pth1) for v in lst.name[lst1]]
    end
end

"""
    get_ecco_velocity_if_needed()

Download ECCO output for `u,v,w` to scratch space if needed
"""
function get_ecco_velocity_if_needed()
    get_ecco_variable_if_needed("UVELMASS")
    get_ecco_variable_if_needed("VVELMASS")
    get_ecco_variable_if_needed("WVELMASS")
end

"""
    get_occa_variable_if_needed(v::String)

Download OCCA output for variable `v` to scratch space if needed
"""
function get_occa_variable_if_needed(v::String)
    lst0=Dataverse.file_list("doi:10.7910/DVN/RNXA2A")
    lst=Dataverse.url_list(lst0)
    fil=joinpath(ScratchSpaces.OCCA,v*".0406clim.nc")
    !isfile(fil) ? Dataverse.file_download(lst,v,ScratchSpaces.OCCA) : nothing
end

"""
    get_occa_velocity_if_needed()

Download OCCA output for `u,v,w` to scratch space if needed
"""
function get_occa_velocity_if_needed()
    nams = ("DDuvel","DDvvel","DDwvel","DDtheta","DDsalt")
    [get_occa_variable_if_needed(nam) for nam in nams]
    "done"
end

## zenodo.org Downloads

"""
    ECCOdiags_add(nam::String)

Add data to the scratch space folder. Known options for `nam` include 
"release1", "release2", "release3", "release4", and "interp_coeffs".
"""
function ECCOdiags_add(nam::String)
    if nam=="release1"
        url="https://zenodo.org/record/6123262/files/ECCOv4r1_analysis.tar.gz"
        fil="ECCOv4r1_analysis.tar.gz"
    elseif nam=="release2"
        url="https://zenodo.org/record/6123272/files/ECCOv4r2_analysis.tar.gz"
        fil="ECCOv4r2_analysis.tar.gz"
    elseif nam=="release3"
        url="https://zenodo.org/record/6123288/files/ECCOv4r3_analysis.tar.gz"
        fil="ECCOv4r3_analysis.tar.gz"
    elseif nam=="release4"
        url="https://zenodo.org/record/6123127/files/ECCOv4r4_analysis.tar.gz"
        fil="ECCOv4r4_analysis.tar.gz"
    elseif nam=="release5"
        url="https://zenodo.org/record/7869067/files/ECCOv4r5_rc2_analysis.tar.gz"
        fil="ECCOv4r5_rc2_analysis.tar.gz"
    elseif nam=="interp_coeffs"
        url="https://zenodo.org/record/5784905/files/interp_coeffs_halfdeg.jld2"
        fil="interp_coeffs_halfdeg.jld2"
    else
        println("unknown release name")
        url=missing
        fil=missing
    end

    if (!ismissing(url))&&(nam=="interp_coeffs")
        ScratchSpaces.download_dataset(url,ScratchSpaces.ECCO)
    elseif (!ismissing(url))&&(!isdir(joinpath(ScratchSpaces.ECCO,fil)[1:end-7]))
        println("downloading "*nam*" ... started")
        ScratchSpaces.download_dataset(url,ScratchSpaces.ECCO)
        tmp_path=open(joinpath(ScratchSpaces.ECCO,fil)) do io
            Tar.extract(CodecZlib.GzipDecompressorStream(io))
        end
        mv(joinpath(tmp_path,fil[1:end-7]),joinpath(ScratchSpaces.ECCO,fil[1:end-7]))
        rm(joinpath(ScratchSpaces.ECCO,fil))
        println("downloading "*nam*" ... done")
    end
end

end
