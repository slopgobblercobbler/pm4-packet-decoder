#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetShRegPairsPackedIndexDef {
    static constexpr std::uint8_t opcode = 0x58;
    static constexpr std::string_view name = "IT_SET_SH_REG_PAIRS_PACKED_INDEX";
    static constexpr std::string_view desc = "Write indexed packed shader register pairs";
};
}
