module OceanStateEstimation

pkg_pth=dirname(pathof(OceanStateEstimation))

include("downloads.jl")
include("ECCO.jl")

get_ecco_files=downloads.get_ecco_files
dataverse_lists=downloads.dataverse_lists
get_from_dataverse=downloads.get_from_dataverse
get_ecco_variable_if_needed=downloads.get_ecco_variable_if_needed
get_ecco_velocity_if_needed=downloads.get_ecco_velocity_if_needed
get_occa_variable_if_needed=downloads.get_occa_variable_if_needed
get_occa_velocity_if_needed=downloads.get_occa_velocity_if_needed

ECCOclim_path=downloads.ECCOclim_path
OCCAclim_path=downloads.OCCAclim_path
MITPROFclim_path=downloads.MITPROFclim_path
CBIOMESclim_path=downloads.CBIOMESclim_path
ECCOdiags_path=downloads.ECCOdiags_path

CBIOMESclim_download=downloads.CBIOMESclim_download
MITPROFclim_download=downloads.MITPROFclim_download
ECCOdiags_download=downloads.ECCOdiags_download
ECCOdiags_add=downloads.ECCOdiags_add

export dataverse_lists, get_from_dataverse
export get_ecco_variable_if_needed, get_ecco_velocity_if_needed
export get_occa_variable_if_needed, get_occa_velocity_if_needed
export ECCOclim_path, OCCAclim_path
export MITPROFclim_path, CBIOMESclim_path, ECCOdiags_path

export ECCO

end # module
